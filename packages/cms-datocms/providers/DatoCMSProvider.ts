import { FindOneParams, FindParams } from '@symbio/cms';
import AbstractProvider from '@symbio/cms/providers/AbstractProvider';
import { Environment, GraphQLTaggedNode, OperationType, fetchQuery } from 'relay-runtime';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { DATOCMS_MAX_LIMIT } from '../constants';
import { DatoCMSRecord, FindResponse, ProviderOptions } from '../types/provider';

export default class DatoCMSProvider<
    TOne extends OperationType,
    TFind extends OperationType,
    TItem extends DatoCMSRecord = DatoCMSRecord,
> extends AbstractProvider<TItem> {
    protected environment: Record<string, Environment> = {
        preview: createRelayEnvironment({}, true),
        production: createRelayEnvironment({}, false),
    };

    protected node: GraphQLTaggedNode;

    protected findNode: GraphQLTaggedNode;

    protected options: ProviderOptions;

    public constructor(node: GraphQLTaggedNode, findNode: GraphQLTaggedNode, options: ProviderOptions) {
        super(options);
        this.node = node;
        this.findNode = findNode;
        this.options = options;
    }

    protected getEnvironment(preview = false): Environment {
        return this.environment[preview ? 'preview' : 'production'];
    }

    public isLocalizable(): boolean {
        return this.options.locales.length > 1;
    }

    getApiKey(): string {
        return this.options.apiKey;
    }

    getId(): string {
        return this.options.id;
    }

    /**
     * Get one item by id or filter
     * @param options
     */
    async findOne(options: FindOneParams | FindParams<TFind['variables']>): Promise<TItem | null> {
        const { locale, preview, id, ...other } = options;
        let variables: TOne['variables'];

        if (id) {
            // get by id
            variables = {
                filter: {
                    id: { eq: id },
                    title: { exists: true },
                    ...this.getFilterParams(),
                },
                locale,
            };
        } else {
            variables = {
                ...other,
                limit: 1,
                offset: 0,
                filter: (options as FindParams<TFind['variables']>).filter
                    ? { ...(options as FindParams<TFind['variables']>).filter, ...this.getFilterParams() }
                    : this.getFilterParams(),
            };
        }

        const result = await fetchQuery<TOne>(this.getEnvironment(preview), this.node, variables);

        return await this.transformResult(result, locale);
    }

    /**
     * Transform result of one query into an item
     * @param result
     * @param locale
     */
    async transformResult(result: TOne['response'], locale?: string): Promise<TItem | null> {
        if (result) {
            return { ...(result as { item: TItem }).item, cmsTypeId: this.getId() };
        } else {
            return null;
        }
    }

    async find(options: FindParams<TFind['variables']>): Promise<FindResponse<TItem[]>> {
        const { preview, ...other } = options;
        const variables = {
            ...other,
            limit: Math.min(options.limit, DATOCMS_MAX_LIMIT),
            offset: 0,
            filter: options.filter ? { ...options.filter, ...this.getFilterParams() } : this.getFilterParams(),
        };

        const result = (await fetchQuery<TFind>(
            this.getEnvironment(preview),
            this.findNode,
            variables,
        ).toPromise()) as unknown as {
            items: TItem[];
            meta: { count: number };
        };

        const count = result.meta.count;
        const data: TItem[] = [...result.items];

        if (options.limit > DATOCMS_MAX_LIMIT) {
            while (options.limit && data.length < count && result.items.length === DATOCMS_MAX_LIMIT) {
                variables.offset = data.length;
                const result = (await fetchQuery<TFind>(
                    this.getEnvironment(preview),
                    this.findNode,
                    variables,
                ).toPromise()) as unknown as {
                    items: TItem[];
                    meta: { count: number };
                };
                if (result) {
                    data.push(...result.items);
                }
            }
        }

        return {
            count,
            data: await this.transformResults(data, options.locale),
        };
    }

    /**
     * Transform find results into array of items
     * @param items
     * @param locale
     */
    async transformResults(items: TItem[], locale?: string): Promise<TItem[]> {
        return items.map((item) => ({ ...item, cmsTypeId: this.getId() })) as unknown as TItem[];
    }

    getFilterParams(): Record<string, unknown> {
        if (this.isLocalizable()) {
            return {
                title: {
                    exists: true,
                },
            };
        }
        return {};
    }

    async getPreviewUrl(id: string, locale?: string, defaultLocale?: string): Promise<string | null> {
        const item = await this.findOne({ id, locale, preview: true });
        if (item) {
            if (locale !== defaultLocale) {
                if (item.url) {
                    return `/${locale}/${item.url}`;
                }
                if (item.slug) {
                    return `/${locale}/${item.id}-${item.slug}`;
                }
                if (item.id) {
                    return `/${locale}/${item.id}`;
                }
            } else {
                if (item.url) {
                    return `/${item.url}`;
                }
                if (item.slug) {
                    return `/${item.id}-${item.slug}`;
                }
                if (item.id) {
                    return `/${item.id}`;
                }
            }
        }
        return null;
    }
}
