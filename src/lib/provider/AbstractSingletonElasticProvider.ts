import { RequestBody } from '@elastic/elasticsearch/lib/Transport';
import { OperationType } from 'relay-runtime';
import { Logger } from '../../services';
import getElastic from '../elastic';
import { i18n } from '../../../symbio.config.json';
import AbstractSingletonDatoCMSProvider from './AbstractSingletonDatoCMSProvider';

export default abstract class AbstractSingletonElasticProvider<
    TOperation extends OperationType
> extends AbstractSingletonDatoCMSProvider<TOperation> {
    /**
     * Get item from elastic search
     * @param locale
     * @param preview
     */
    async getByElastic(locale?: string, preview = false): Promise<unknown | null> {
        const options = {
            index: this.getIndex(locale, !preview),
            body: {
                size: 1,
                query: {
                    match_all: {},
                },
            },
        };
        const result = await getElastic().search(options);
        const { hits, total } = result.body.hits;

        if (total.value < 1) {
            return null;
        }

        return hits[0]._source;
    }

    /**
     * Get source fields (default all)
     * @override
     */
    getSource(): string[] | undefined {
        return undefined;
    }

    /**
     * Get item for search indexing
     * @param locale
     * @param preview
     */
    async getForIndex(locale?: string, preview = false): Promise<unknown> {
        return await this.get(locale, preview);
    }

    /**
     * Index in elastic search
     * @param simple
     * @param prod
     */
    async index(simple = false, prod = false): Promise<void> {
        if (this.isLocalizable()) {
            for (const locale of i18n.locales) {
                const item = await this.getForIndex(locale, !prod);

                if (!item || typeof item !== 'object') {
                    await this.unindex(locale, prod);
                    continue;
                }

                if (!simple) {
                    await this.createAndReindex(locale, prod);
                }

                await getElastic().index({
                    index: this.getIndex(locale, prod),
                    body: { ...item, locale },
                    refresh: true,
                    id: '1',
                });
            }
        } else {
            const item = await this.getForIndex(undefined, !prod);

            if (!item) {
                await this.unindex(undefined, prod);
                return;
            }

            if (!simple) {
                await this.createAndReindex(undefined, prod);
            }

            await getElastic().index({
                index: this.getIndex(undefined, prod),
                body: item as RequestBody,
                refresh: true,
                id: '1',
            });
        }
    }

    async createAndReindex(locale?: string, prod?: boolean): Promise<void> {
        try {
            const index = this.getIndex(locale, prod);
            const result = await getElastic().indices.exists({
                index,
            });

            if (!result.body) {
                console.info('Creating index ' + index);
                await getElastic().indices.create({
                    index,
                    body: {
                        settings: {
                            analysis: {
                                analyzer: {
                                    default: {
                                        type: locale === 'en' ? 'english' : 'czech',
                                    },
                                    czech: {
                                        type: 'custom',
                                        tokenizer: 'standard',
                                        char_filter: ['html_strip'],
                                        filter: [
                                            'czechStop',
                                            'czechStemmer',
                                            'lowercase',
                                            'czechStop',
                                            'icu_folding',
                                            'uniqueOnSamePosition',
                                        ],
                                    },
                                    english: {
                                        type: 'custom',
                                        tokenizer: 'standard',
                                        char_filter: ['html_strip'],
                                        filter: ['lowercase', 'icu_folding', 'uniqueOnSamePosition'],
                                    },
                                },
                                filter: {
                                    czechStemmer: {
                                        type: 'stemmer',
                                        name: 'czech',
                                    },
                                    czechStop: {
                                        type: 'stop',
                                        stopwords: ['že', '_czech_'],
                                    },
                                    uniqueOnSamePosition: {
                                        type: 'unique',
                                        only_on_same_position: true,
                                    },
                                },
                            },
                        },
                    },
                });

                if (this.getIndexVersion() > 1 || prod) {
                    const sourceIndex = await (async () => {
                        if (prod) {
                            if (this.getIndexVersion() > 1) {
                                const result = await getElastic().indices.exists({
                                    index: this.getIndex(locale, prod, this.getIndexVersion() - 1),
                                });
                                if (result.body) {
                                    return this.getIndex(locale, prod, this.getIndexVersion() - 1);
                                }
                            }
                            const result2 = await getElastic().indices.exists({
                                index: this.getIndex(locale, false, this.getIndexVersion()),
                            });
                            if (result2.body) {
                                return this.getIndex(locale, false, this.getIndexVersion());
                            }
                        }
                        if (this.getIndexVersion() > 1) {
                            const result = await getElastic().indices.exists({
                                index: this.getIndex(locale, false, this.getIndexVersion() - 1),
                            });
                            if (result.body) {
                                return this.getIndex(locale, false, this.getIndexVersion() - 1);
                            }
                        }
                        return false;
                    })();
                    if (sourceIndex) {
                        console.info('Reindexing ' + sourceIndex + ' to ' + index);
                        await getElastic().reindex({
                            body: {
                                source: {
                                    index: sourceIndex,
                                },
                                dest: {
                                    index,
                                },
                            },
                        });
                    }
                }
                console.log('Done');
            }
        } catch (e) {
            console.error(e.meta.body.error);
        }
    }

    /**
     * Remove from index in elastic search
     * @param locale
     * @param prod
     */
    async unindex(locale?: string, prod?: boolean): Promise<void> {
        const unindexItem = async (locale: string) => {
            try {
                await getElastic().delete({
                    index: this.getIndex(locale, false),
                    id: '1',
                });
                Logger.log('Unindex from ' + this.getIndex(locale, false));
                if (prod) {
                    await getElastic().delete({
                        index: this.getIndex(locale, prod),
                        id: '1',
                    });
                    Logger.log('Unindex from ' + this.getIndex(locale, prod));
                }
            } catch (e) {
                Logger.log('Unindex ' + locale + ' failed');
            }
        };

        if (locale) {
            await unindexItem(locale);
        } else {
            for (const locale of i18n.locales) {
                await unindexItem(locale);
            }
        }
    }

    /**
     * Get suffix for versioned indexing
     */
    getIndexVersion(): number {
        return 1;
    }

    /**
     * Get full index name
     */
    getIndex(locale?: string, prod?: boolean | undefined, version?: number): string {
        const ver = version || this.getIndexVersion();
        const suffix = typeof prod === 'undefined' && prod ? '_prod' : '';
        if (this.isLocalizable()) {
            return this.getApiKey() + '_' + locale + '_v' + ver + suffix;
        } else {
            return this.getApiKey() + '_v' + ver + suffix;
        }
    }
}
