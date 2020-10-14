import { RequestBody } from '@elastic/elasticsearch/lib/Transport';
import { OperationType } from 'relay-runtime';
import { Logger } from '../../services';
import AbstractDatoCMSProvider from './AbstractDatoCMSProvider';
import getElastic from '../elastic';
import { Search } from '@elastic/elasticsearch/api/requestParams';
import { i18n } from '../../../symbio.config.json';
import { FindResponse } from './Provider';
import isStaging from '../../utils/isStaging';

export default abstract class AbstractElasticProvider<
    TOne extends OperationType,
    TFind extends OperationType
> extends AbstractDatoCMSProvider<TOne, TFind> {
    /**
     * Find items by querying elastic search
     * @param id
     * @param locale
     */
    async findOneByElastic(id: string, locale?: string): Promise<unknown | null> {
        const options = {
            index: this.getIndex(locale),
            body: {
                query: {
                    term: {
                        id,
                    },
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
     * Find items by querying elastic search
     * @param options
     * @param locale
     */
    async findByElastic(options: Search, locale?: string): Promise<FindResponse> {
        options.index = this.getIndex(locale);
        try {
            const result = await getElastic().search(options);
            const { hits, total } = result.body.hits;
            return {
                count: total.value,
                data: hits.map((h: { _source: unknown }) => h._source),
            };
        } catch (e) {
            console.error(e.meta.body.error);
            return {
                count: 0,
                data: [],
            };
        }
    }

    /**
     * Get total count of items by querying elastic count API
     * @param options
     * @param locale
     */
    async getCount(options: Search, locale?: string): Promise<number> {
        options.index = this.getIndex(locale);
        const result = await getElastic().count(options);
        return result.body.count;
    }

    /**
     * Get total count of items by querying elastic count API
     * @param locale
     */
    async getTotalCount(locale?: string): Promise<number> {
        const result = await getElastic().count({
            index: this.getIndex(locale),
        });
        return result.body.count;
    }

    /**
     * Get one item by id for search indexing
     * @param id
     * @param locale
     */
    async findOneForIndex(id: string, locale?: string): Promise<unknown> {
        const item = await this.findOne(id, locale);
        return typeof item === 'object' ? (this.isLocalizable() ? { ...item, locale } : item) : null;
    }

    /**
     * Index in elastic search
     * @param id
     * @param simple
     * @param prod
     */
    async indexByElastic(id: string, simple = false, prod = false): Promise<void> {
        if (this.isLocalizable()) {
            for (const locale of i18n.locales) {
                const item = await this.findOneForIndex(id, locale);

                if (!item || typeof item !== 'object') {
                    await this.unindexByElastic(id, locale, prod);
                    continue;
                }

                if (!simple) {
                    await this.createAndReindex(locale, prod);
                }

                await getElastic().index({
                    index: this.getIndex(locale, undefined, prod),
                    body: { ...item, locale },
                    refresh: true,
                    id,
                });
            }
        } else {
            const item = await this.findOneForIndex(id);

            if (!item) {
                await this.unindexByElastic(id, undefined, prod);
                return;
            }

            if (!simple) {
                await this.createAndReindex(undefined, prod);
            }

            await getElastic().index({
                index: this.getIndex(undefined, undefined, prod),
                body: item as RequestBody,
                refresh: true,
                id,
            });
        }
    }

    async createAndReindex(locale?: string, prod?: boolean): Promise<void> {
        try {
            const index = this.getIndex(locale, undefined, prod);
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
                                        type: 'czech',
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

                console.info('Creating mapping for index ' + index);
                try {
                    await getElastic().indices.putMapping({
                        index,
                        body: {
                            properties: this.getMappingProperties(locale),
                            dynamic_templates: [
                                {
                                    slugs: {
                                        path_match: '*.slug',
                                        mapping: {
                                            type: 'keyword',
                                            copy_to: '_all',
                                        },
                                    },
                                },
                                {
                                    _all: {
                                        match_mapping_type: 'string',
                                        unmatch: 'id',
                                        mapping: {
                                            copy_to: '_all',
                                            type: 'text',
                                        },
                                    },
                                },
                            ],
                        },
                    });
                } catch (e) {
                    console.error(e.meta.body.error);
                }

                if (this.getIndexVersion() > 1 || prod) {
                    const sourceIndex = await (async () => {
                        if (prod) {
                            if (this.getIndexVersion() > 1) {
                                const result = await getElastic().indices.exists({
                                    index: this.getIndex(locale, this.getIndexVersion() - 1, prod),
                                });
                                if (result.body) {
                                    return this.getIndex(locale, this.getIndexVersion() - 1, prod);
                                }
                            }
                            const result2 = await getElastic().indices.exists({
                                index: this.getIndex(locale, this.getIndexVersion()),
                            });
                            if (result2.body) {
                                return this.getIndex(locale, this.getIndexVersion());
                            }
                        }
                        if (this.getIndexVersion() > 1) {
                            const result = await getElastic().indices.exists({
                                index: this.getIndex(locale, this.getIndexVersion() - 1),
                            });
                            if (result.body) {
                                return this.getIndex(locale, this.getIndexVersion() - 1);
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
            console.error(e);
        }
    }

    /**
     * Remove from index in elastic search
     * @param id
     * @param locale
     * @param prod
     */
    async unindexByElastic(id: string, locale?: string, prod?: boolean): Promise<void> {
        const unindexItem = async (locale: string) => {
            try {
                await getElastic().delete({
                    index: this.getIndex(locale),
                    id,
                });
                Logger.log('Unindex ' + id + ' from ' + this.getIndex(locale));
                if (prod) {
                    await getElastic().delete({
                        index: this.getIndex(locale, undefined, prod),
                        id,
                    });
                    Logger.log('Unindex ' + id + ' from ' + this.getIndex(locale, undefined, prod));
                }
            } catch (e) {
                Logger.log('Unindex ' + id + ' ' + locale + ' failed');
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
    getIndex(locale?: string, version?: number, prod?: boolean | undefined): string {
        const ver = version || this.getIndexVersion();
        const suffix = typeof prod === 'undefined' ? (isStaging() ? '' : '_prod') : prod ? '_prod' : '';
        if (this.isLocalizable()) {
            return this.getApiKey() + '_' + locale + '_v' + ver + suffix;
        } else {
            return this.getApiKey() + '_v' + ver + suffix;
        }
    }

    /**
     * Get mapping properties
     */
    getMappingProperties(
        locale?: string,
    ): Record<string, Record<string, string | boolean | Record<string, string | Record<string, string | boolean>>>> {
        return {
            id: {
                type: 'keyword',
            },
            title: {
                type: 'text',
                analyzer: 'czech',
                fields: {
                    sort: {
                        type: 'icu_collation_keyword',
                        index: false,
                        language: (this.isLocalizable() && locale) || 'cs',
                        variant: '@collation=standard',
                        strength: 'primary',
                    },
                },
            },
            _all: {
                type: 'text',
                analyzer: 'czech',
            },
        };
    }
}
