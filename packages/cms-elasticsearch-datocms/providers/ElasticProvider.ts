import { RequestBody } from '@elastic/elasticsearch/lib/Transport';
import { FindResponse } from '@symbio/cms';
import { DatoCMSRecord } from '@symbio/cms-datocms/types/provider';
import { OperationType } from 'relay-runtime';
import { Logger } from '@symbio/headless/dist/services';
import DatoCMSProvider from '@symbio/cms-datocms/dist/providers/DatoCMSProvider';
import { Search } from '@elastic/elasticsearch/api/requestParams';
import getElastic from '../elastic';
import { AggregatedType, ElasticType } from '../types/elastic';

export interface GetBodyProps {
    size?: number;
    from?: number;
    sort?: Record<string, string> | Array<Record<string, string>>;
    _source?: string[];
    filter?: Record<string, any>;
}

export interface SearchProps extends GetBodyProps {
    locale?: string;
    preview?: boolean;
}

export interface IndexingResultItem {
    type: string;
    locale?: string;
    id: string;
}

export default abstract class ElasticProvider<
    TOne extends OperationType,
    TFind extends OperationType,
    TItem extends DatoCMSRecord = DatoCMSRecord,
    TItems extends ReadonlyArray<DatoCMSRecord> = ReadonlyArray<DatoCMSRecord>,
> extends DatoCMSProvider<TOne, TFind, TItem, TItems> {
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
        options.index = options.index || this.getIndex(locale, !preview);
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

    mapElasticStructure(data: ElasticType<TItem>): FindResponse<TItem[]> {
        return { count: data.hits?.total?.value ?? 0, data: data.hits?.hits?.map((hit) => hit._source) ?? [] };
    }

    /**
     * Get source fields (default all)
     * @override
     */
    getSource(): string[] | undefined {
        return undefined;
    }

    getFilterForSearch(filters?: Record<string, any>): Record<string, any>[] {
        return [];
    }

    /**
     * Get search body (default all)
     * @override
     */
    getBody({ size, from, sort, _source, filter }: GetBodyProps): Record<string, any> {
        return {
            query: {
                bool: {
                    filter: this.getFilterForSearch(filter),
                },
            },
            size,
            from,
            ...(sort && { sort }),
            _source: _source || this.getSource(),
        };
    }

    async search({ locale, preview, filter, size = 9, from = 0, sort }: SearchProps) {
        const body = this.getBody({
            size,
            from,
            sort,
            filter,
        });

        return await this.findByElastic({ body }, locale, preview);
    }

    getMSearchBody(
        locale: string | undefined,
        preview: boolean | undefined,
        size = 20,
        from = 0,
        sort?: Record<string, string> | Array<Record<string, string>>,
        filter?: Record<string, any>,
    ): Record<string, any>[] {
        return [{ index: this.getIndex(locale, !preview) }, this.getBody({ size, from, sort, filter })];
    }

    getAggregatedKeys<T>(data: AggregatedType<T>, key: string): string[] {
        return data.aggregations[key].buckets.map((agg) => agg.key);
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
    async indexOne(id: string, simple = false, prod = false): Promise<Array<IndexingResultItem>> {
        const result: IndexingResultItem[] = [];
        if (this.isLocalizable()) {
            for (const locale of this.options.locales) {
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
                    body: { ...item },
                    refresh: true,
                    id,
                });

                result.push({
                    id,
                    type: this.getApiKey(),
                    locale,
                });
            }
        } else {
            const item = await this.findOneForIndex(id, undefined, !prod);

            if (!item) {
                await this.unindex(id, undefined, prod);
                return result;
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

            result.push({
                id,
                type: this.getApiKey(),
            });
        }

        return result;
    }

    /**
     * Index in elastic search
     * @param simple
     * @param prod
     * @param options
     */
    async indexAll(
        simple = false,
        prod = false,
        options?: Omit<TFind['variables'], 'locale'> & { locale?: string },
    ): Promise<Array<IndexingResultItem>> {
        const result: Array<IndexingResultItem> = [];
        if (this.isLocalizable()) {
            for (const locale of this.options.locales) {
                Logger.info('Indexing', this.getIndex(locale, prod));

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const { data } = await this.find({ ...options, limit: Infinity, locale } as any, !prod);

                Logger.info('Found', data.length, 'items');

                if (!simple) {
                    await this.createAndReindex(locale, prod);
                }

                for (const item of data) {
                    if (item) {
                        await getElastic().index({
                            index: this.getIndex(locale, prod),
                            body: item,
                            refresh: true,
                            id: item.id,
                        });
                        result.push({
                            id: item.id,
                            type: this.getApiKey(),
                            locale,
                        });
                    }
                }
            }
            return result;
        } else {
            Logger.info('Indexing', this.getIndex(undefined, prod));

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { data } = await this.find({ ...options, limit: Infinity }, !prod);

            Logger.info('Found', data.length, 'items');

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
                    result.push({
                        id: item.id,
                        type: this.getApiKey(),
                    });
                }
            }
            return result;
        }
    }

    /**
     * Delete items which remained in elastic but are not in CMS anymore
     * @param prod
     */
    async deleteRelics(prod = false): Promise<void> {
        Logger.log('Deleting relics for', this.getApiKey(), prod);
        if (this.isLocalizable()) {
            for (const locale of this.options.locales) {
                Logger.log(`Getting data for ${this.getIndex(locale, prod)}`);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const { data } = await this.find<TOne>({ locale, limit: Infinity }, !prod);
                const cmsIds = data.map((item: DatoCMSRecord) => item?.id).filter(Boolean);

                const { data: data2 } = await this.findByElastic({ size: 10000 }, locale, !prod);
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
            Logger.log(`Getting data for ${this.getIndex(undefined, prod)}`);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { data } = await this.find({ limit: Infinity }, !prod);

            const cmsIds = data.map((item: DatoCMSRecord) => item?.id).filter(Boolean);

            const { data: data2 } = await this.findByElastic({ size: 10000 }, undefined, !prod);
            const elasticIds = data2.map((i) => i && i.id).filter(Boolean);

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
                await this.createIndex(locale, prod);
                await this.createMapping(locale, prod);
                await this.reindex(locale, prod);
                Logger.log('Done');
            }
        } catch (e) {
            Logger.error(e.meta.body.error);
        }
    }

    /**
     * Delete index, recreate it and it's mapping and index all data for all locales
     * @param prod
     */
    async deleteAndIndexAll(prod?: boolean): Promise<void> {
        try {
            if (this.isLocalizable()) {
                for (const locale of this.options.locales) {
                    const index = this.getIndex(locale, prod);
                    const result = await getElastic().indices.exists({
                        index,
                    });

                    if (result.body) {
                        await this.deleteIndex(locale, prod);
                    }
                    await this.createIndex(locale, prod);
                    await this.createMapping(locale, prod);
                }
            } else {
                const index = this.getIndex(undefined, prod);
                const result = await getElastic().indices.exists({
                    index,
                });

                if (result.body) {
                    await this.deleteIndex(undefined, prod);
                }
                await this.createIndex(undefined, prod);
                await this.createMapping(undefined, prod);
            }
            await this.indexAll(false, prod);
            Logger.log('Done');
        } catch (e) {
            Logger.error(e.meta.body.error);
        }
    }

    /**
     * Delete current index
     * @param locale
     * @param prod
     */
    async deleteIndex(locale?: string, prod?: boolean): Promise<void> {
        const index = this.getIndex(locale, prod);
        await getElastic().indices.delete({
            index,
        });
        Logger.info('Deleting index ' + index);
    }

    /**
     * Create index
     * @param locale
     * @param prod
     */
    async createIndex(locale?: string, prod?: boolean): Promise<void> {
        const index = this.getIndex(locale, prod);
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
                            trigram: {
                                type: 'custom',
                                tokenizer: 'standard',
                                char_filter: ['html_strip'],
                                filter: ['czechStop', 'czechStemmer', 'lowercase', 'shingle'],
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
                            shingle: {
                                type: 'shingle',
                                min_shingle_size: 2,
                                max_shingle_size: 3,
                            },
                        },
                    },
                },
            },
        });
    }

    /**
     * Create mapping for index (must be executed before indexing data)
     * @param locale
     * @param prod
     */
    async createMapping(locale?: string, prod?: boolean): Promise<void> {
        const index = this.getIndex(locale, prod);
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
                            titles: {
                                path_match: '*.title',
                                mapping: {
                                    type: 'text',
                                    analyzer: locale === 'en' ? 'english' : 'czech',
                                    index_prefixes: {
                                        min_chars: 1,
                                        max_chars: 10,
                                    },
                                    fields: {
                                        sort: {
                                            type: 'icu_collation_keyword',
                                            index: false,
                                            language: (this.isLocalizable() && locale) || 'cs',
                                            variant: '@collation=standard',
                                            strength: 'primary',
                                        },
                                        suggest: {
                                            type: 'completion',
                                            analyzer: locale === 'en' ? 'english' : 'czech',
                                        },
                                        search: {
                                            type: 'search_as_you_type',
                                            analyzer: locale === 'en' ? 'english' : 'czech',
                                        },
                                    },
                                },
                            },
                        },
                        {
                            slug: {
                                path_match: 'slug',
                                mapping: {
                                    type: 'keyword',
                                },
                            },
                        },
                        {
                            slugs: {
                                path_match: '*.slug',
                                mapping: {
                                    type: 'keyword',
                                },
                            },
                        },
                        {
                            url: {
                                path_match: 'url',
                                mapping: {
                                    type: 'keyword',
                                },
                            },
                        },
                        {
                            urls: {
                                path_match: '*.url',
                                mapping: {
                                    type: 'keyword',
                                },
                            },
                        },
                        {
                            __typename: {
                                path_match: '__typename',
                                mapping: {
                                    type: 'keyword',
                                },
                            },
                        },
                        {
                            __typenames: {
                                path_match: '*.__typename',
                                mapping: {
                                    type: 'keyword',
                                },
                            },
                        },
                        {
                            meta_tags: {
                                path_match: '_seoMetaTags.attributes.content',
                                mapping: {
                                    type: 'text',
                                },
                            },
                        },
                        {
                            child_meta_tags: {
                                path_match: '*._seoMetaTags.attributes.content',
                                mapping: {
                                    type: 'text',
                                },
                            },
                        },
                        {
                            amount: {
                                path_match: '*.amount',
                                mapping: {
                                    type: 'float',
                                },
                            },
                        },
                    ],
                },
            });
        } catch (e) {
            Logger.error(e.meta.body.error);
        }
    }

    /**
     * Run reindex from previous index version if index version > 1
     * @param locale
     * @param prod
     */
    async reindex(locale?: string, prod?: boolean): Promise<void> {
        const index = this.getIndex(locale, prod);
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
                    index: this.getIndex(locale, prod),
                    id,
                });
                Logger.log('Unindex ' + id + ' from ' + this.getIndex(locale, prod));
            } catch (e) {
                console.error(e);
                Logger.log('Unindex ' + id + ' ' + locale + ' failed');
            }
        };

        if (locale) {
            await unindexItem(locale);
        } else {
            for (const locale of this.options.locales) {
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
        const suffix = typeof prod !== 'undefined' && prod ? '_prod' : '';
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
        Record<
            string,
            | string
            | boolean
            | number
            | Record<string, string | number | Record<string, string | boolean | number | Record<string, number>>>
        >
    > {
        return {
            id: {
                type: 'keyword',
            },
            title: {
                type: 'text',
                analyzer: locale === 'en' ? 'english' : 'czech',
                index_prefixes: {
                    min_chars: 1,
                    max_chars: 10,
                },
                fields: {
                    sort: {
                        type: 'icu_collation_keyword',
                        index: false,
                        language: (this.isLocalizable() && locale) || 'cs',
                        variant: '@collation=standard',
                        strength: 'primary',
                    },
                    suggest: {
                        type: 'completion',
                        analyzer: locale === 'en' ? 'english' : 'czech',
                    },
                    search: {
                        type: 'search_as_you_type',
                        analyzer: locale === 'en' ? 'english' : 'czech',
                    },
                },
            },
        };
    }

    async getPreviewUrl(id: string, locale?: string): Promise<string | null> {
        const item = await this.findOneByElastic(id, locale, true);
        if (locale !== this.options.locales[0]) {
            if (item) {
                if (item.url) {
                    if (item.url === 'homepage') {
                        return `/${locale}`;
                    } else {
                        return `/${locale}/${item.url}`;
                    }
                }
                if (item.slug) {
                    return `/${locale}/${item.id}-${item.slug}`;
                }
                if (item.id) {
                    return `/${locale}/${item.id}`;
                }
            }
            return null;
        } else {
            const item = await this.findOne(id);
            if (item) {
                if (item.url) {
                    if (item.url === 'homepage') {
                        return '/';
                    } else {
                        return `/${item.url}`;
                    }
                }
                if (item.slug) {
                    return `/${item.id}-${item.slug}`;
                }
                if (item.id) {
                    return `/${item.id}`;
                }
            }
            return null;
        }
    }
}
