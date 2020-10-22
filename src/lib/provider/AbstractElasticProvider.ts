import { RequestBody } from '@elastic/elasticsearch/lib/Transport';
import { OperationType } from 'relay-runtime';
import { Logger } from '../../services';
import AbstractDatoCMSProvider, { DatoCMSRecord } from './AbstractDatoCMSProvider';
import getElastic from '../elastic';
import { Search } from '@elastic/elasticsearch/api/requestParams';
import { i18n } from '../../../symbio.config.json';
import { FindResponse } from './AbstractDatoCMSProvider';

export default abstract class AbstractElasticProvider<
    TOne extends OperationType,
    TFind extends OperationType,
    TItem extends DatoCMSRecord = DatoCMSRecord,
    TItems extends ReadonlyArray<DatoCMSRecord> = ReadonlyArray<DatoCMSRecord>
> extends AbstractDatoCMSProvider<TOne, TFind, TItem, TItems> {
    /**
     * Find items by querying elastic search
     * @param id
     * @param locale
     * @param preview
     */
    async findOneByElastic(id: string, locale?: string, preview = false): Promise<TItem | null> {
        const options = {
            index: this.getIndex(locale, !preview),
            body: {
                size: 1,
                query: {
                    ids: {
                        values: [id],
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
     * @param preview
     */
    async findByElastic(options: Search, locale?: string, preview = false): Promise<FindResponse<TItem[]>> {
        options.index = this.getIndex(locale, !preview);
        options._source = options._source || this.getSource();
        try {
            const result = await getElastic().search(options);
            const { hits, total } = result.body.hits;
            return {
                count: total.value,
                data: hits.map((h: { _source: unknown }) => h._source),
            };
        } catch (e) {
            Logger.log('ELASTIC ERROR:', JSON.stringify(options));
            Logger.error(e.meta.body.error);
            return {
                count: 0,
                data: [],
            };
        }
    }

    /**
     * Get source fields (default all)
     * @override
     */
    getSource(): string[] | undefined {
        return undefined;
    }

    /**
     * Get total count of items by querying elastic count API
     * @param options
     * @param locale
     * @param preview
     */
    async getCount(options: Search, locale?: string, preview = false): Promise<number> {
        options.index = this.getIndex(locale, !preview);
        const result = await getElastic().count(options);
        return result.body.count;
    }

    /**
     * Get total count of items by querying elastic count API
     * @param locale
     * @param preview
     */
    async getTotalCount(locale?: string, preview = false): Promise<number> {
        const result = await getElastic().count({
            index: this.getIndex(locale, !preview),
        });
        return result.body.count;
    }

    /**
     * Search for aggregations
     * @param {Search} options
     * @param {string} locale
     * @param {boolean} preview
     * @returns {Promise<any>}
     */
    async findAggs(options: Search, locale?: string, preview = false): Promise<unknown> {
        options.index = this.getIndex(locale, !preview);
        options.size = 0;
        try {
            const result = await getElastic().search(options);
            return result.body.aggregations;
        } catch (e) {
            Logger.log('ELASTIC ERROR:', JSON.stringify(options));
            Logger.error(e.meta.body.error);
            return null;
        }
    }

    /**
     * Get one item by id for search indexing
     * @param id
     * @param locale
     * @param preview
     */
    async findOneForIndex(id: string, locale?: string, preview = false): Promise<unknown> {
        return await this.findOne(id, locale, preview);
    }

    /**
     * Index in elastic search
     * @param id
     * @param simple
     * @param prod
     */
    async indexOne(id: string, simple = false, prod = false): Promise<void> {
        if (this.isLocalizable()) {
            for (const locale of i18n.locales) {
                const item = await this.findOneForIndex(id, locale, !prod);

                if (!item || typeof item !== 'object') {
                    await this.unindex(id, locale, prod);
                    continue;
                }

                if (!simple) {
                    await this.createAndReindex(locale, prod);
                }

                await getElastic().index({
                    index: this.getIndex(locale, prod),
                    body: { ...item, locale },
                    refresh: true,
                    id,
                });
            }
        } else {
            const item = await this.findOneForIndex(id, undefined, !prod);

            if (!item) {
                await this.unindex(id, undefined, prod);
                return;
            }

            if (!simple) {
                await this.createAndReindex(undefined, prod);
            }

            await getElastic().index({
                index: this.getIndex(undefined, prod),
                body: item as RequestBody,
                refresh: true,
                id,
            });
        }
    }

    /**
     * Index in elastic search
     * @param simple
     * @param prod
     */
    async indexAll(simple = false, prod = false): Promise<void> {
        if (this.isLocalizable()) {
            for (const locale of i18n.locales) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const { data } = await this.find({ locale, limit: Infinity }, !prod);

                Logger.log('indexing', this.getApiKey(), 'count', data.length);

                if (!simple) {
                    await this.createAndReindex(locale, prod);
                }

                for (const item of data) {
                    if (item) {
                        await getElastic().index({
                            index: this.getIndex(locale, prod),
                            body: { ...item, locale },
                            refresh: true,
                            id: item.id,
                        });
                    }
                }
            }
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { data } = await this.find({}, !prod);

            if (!simple) {
                await this.createAndReindex(undefined, prod);
            }

            for (const item of data) {
                if (item) {
                    await getElastic().index({
                        index: this.getIndex(undefined, prod),
                        body: { ...item },
                        refresh: true,
                        id: item.id,
                    });
                }
            }
        }
    }

    /**
     * Index in elastic search
     * @param prod
     */
    async deleteRelics(prod = false): Promise<void> {
        Logger.log('Deleting relics for', this.getApiKey(), prod);
        if (this.isLocalizable()) {
            for (const locale of i18n.locales) {
                Logger.log('Getting data for', this.getApiKey(), locale);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const { data } = await this.find({ locale, limit: Infinity });
                const cmsIds = data.map((item) => item?.id).filter((id) => id);

                const { data: data2 } = await this.findByElastic({ size: 10000 }, locale);
                const elasticIds = data2.map((i) => i && i.id).filter((i) => i);

                for (const id of elasticIds) {
                    if (id && cmsIds.indexOf(id) === -1) {
                        Logger.log('Unindexing ' + id);
                        await this.unindex(id, locale, prod);
                    }
                }

                Logger.log('Done');
            }
        } else {
            Logger.log('Getting data for', this.getApiKey());

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { data } = await this.find({ limit: Infinity }, !prod);

            const cmsIds = data.map((item) => item?.id).filter((id) => id);

            const { data: data2 } = await this.findByElastic({ size: 10000 });
            const elasticIds = data2.map((i) => i && i.id).filter((i) => i);

            for (const id of elasticIds) {
                if (id && cmsIds.indexOf(id) === -1) {
                    Logger.log('Unindexing ' + id);
                    await this.unindex(id, undefined, prod);
                }
            }

            Logger.log('Done');
        }
    }

    async createAndReindex(locale?: string, prod?: boolean): Promise<void> {
        try {
            const index = this.getIndex(locale, prod);
            const result = await getElastic().indices.exists({
                index,
            });

            if (!result.body) {
                Logger.info('Creating index ' + index);
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

                Logger.info('Creating mapping for index ' + index);
                try {
                    await getElastic().indices.putMapping({
                        index,
                        body: {
                            properties: this.getMappingProperties(locale),
                            dynamic_templates: [
                                {
                                    ids: {
                                        path_match: '*.id',
                                        mapping: {
                                            type: 'keyword',
                                        },
                                    },
                                },
                                {
                                    slug: {
                                        path_match: 'slug',
                                        mapping: {
                                            type: 'keyword',
                                            copy_to: '_all',
                                        },
                                    },
                                },
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
                                    url: {
                                        path_match: 'url',
                                        mapping: {
                                            type: 'keyword',
                                            copy_to: '_all',
                                        },
                                    },
                                },
                                {
                                    urls: {
                                        path_match: '*.url',
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
                                            analyzer: locale === 'en' ? 'english' : 'czech',
                                        },
                                    },
                                },
                            ],
                        },
                    });
                } catch (e) {
                    Logger.error(e.meta.body.error);
                }

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
                        Logger.info('Reindexing ' + sourceIndex + ' to ' + index);
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
                Logger.log('Done');
            }
        } catch (e) {
            Logger.error(e.meta.body.error);
        }
    }

    /**
     * Remove from index in elastic search
     * @param id
     * @param locale
     * @param prod
     */
    async unindex(id: string, locale?: string, prod?: boolean): Promise<void> {
        const unindexItem = async (locale: string) => {
            try {
                await getElastic().delete({
                    index: this.getIndex(locale),
                    id,
                });
                Logger.log('Unindex ' + id + ' from ' + this.getIndex(locale));
                if (prod) {
                    await getElastic().delete({
                        index: this.getIndex(locale, prod),
                        id,
                    });
                    Logger.log('Unindex ' + id + ' from ' + this.getIndex(locale, prod));
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
    getIndex(locale?: string, prod?: boolean | undefined, version?: number): string {
        const ver = version || this.getIndexVersion();
        const suffix = typeof prod === 'undefined' && prod ? '_prod' : '';
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
    ): Record<
        string,
        Record<string, string | boolean | number | Record<string, string | Record<string, string | boolean>>>
    > {
        return {
            id: {
                type: 'keyword',
            },
            title: {
                type: 'text',
                analyzer: locale === 'en' ? 'english' : 'czech',
                copy_to: '_all',
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
                analyzer: locale === 'en' ? 'english' : 'czech',
            },
        };
    }
}
