import { Environment, GraphQLTaggedNode, OperationType, fetchQuery } from 'relay-runtime';
import { Provider } from '@symbio/cms';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { DATOCMS_MAX_LIMIT } from '../constants';

export type DatoCMSRecord = {
    id: string;
    [key: string]: unknown;
} | null;

export interface FindResponse<T> {
    count: number;
    data: T;
}

export interface ProviderOptions {
    locales: string[];
    apiKey: string;
    id: string;
}

export default abstract class AbstractDatoCMSProvider<
    TOne extends OperationType,
    TFind extends OperationType,
    TItem extends DatoCMSRecord = DatoCMSRecord,
    TItems extends ReadonlyArray<DatoCMSRecord> = ReadonlyArray<DatoCMSRecord>
> implements Provider {
    protected environment: Record<string, Environment> = {
        preview: createRelayEnvironment({}, true),
        production: createRelayEnvironment({}, false),
    };

    protected node: GraphQLTaggedNode;

    protected findNode: GraphQLTaggedNode;

    protected options: ProviderOptions;

    public constructor(node: GraphQLTaggedNode, findNode: GraphQLTaggedNode, options: ProviderOptions) {
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
     * @param options,
     * @param locale
     * @param preview
     */
    async findOne(
        options: string | Omit<TFind['variables'], 'locale'>,
        locale?: string,
        preview = false,
    ): Promise<TItem | null> {
        const variables: TOne['variables'] =
            typeof options === 'string'
                ? {
                      filter: {
                          id: { eq: options },
                          title: { exists: true },
                          ...this.getFilterParams(),
                      },
                      locale,
                  }
                : {
                      ...options,
                      limit: 1,
                      offset: 0,
                      filter: options.filter
                          ? { ...options.filter, ...this.getFilterParams() }
                          : this.getFilterParams(),
                      locale,
                  };

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

    async find(
        options: Omit<TFind['variables'], 'locale'> & { locale?: string },
        preview = false,
    ): Promise<FindResponse<TItems>> {
        const variables = {
            ...options,
            limit: Math.min(options.limit, DATOCMS_MAX_LIMIT),
            offset: 0,
            filter: options.filter ? { ...options.filter, ...this.getFilterParams() } : this.getFilterParams(),
        };

        if (this.isLocalizable()) {
            variables.locale = options.locale;
        }

        const result = ((await fetchQuery<TFind>(
            this.getEnvironment(preview),
            this.findNode,
            variables,
        )) as unknown) as {
            items: TItems;
            meta: { count: number };
        };

        const count = result.meta.count;
        const data: Mutable<TItems> = [...result.items] as Mutable<TItems>;

        if (options.limit > DATOCMS_MAX_LIMIT) {
            while (options.limit && data.length < count && result.items.length === DATOCMS_MAX_LIMIT) {
                variables.offset = data.length;
                const result = ((await fetchQuery<TFind>(
                    this.getEnvironment(preview),
                    this.findNode,
                    variables,
                )) as unknown) as {
                    items: TItems;
                };
                data.push(...result.items);
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
    async transformResults(items: TItems, locale?: string): Promise<TItems> {
        return (items.map((item) => ({ ...item, cmsTypeId: this.getId() })) as unknown) as TItems;
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
        const item = await this.findOne(id, locale);
        if (locale !== defaultLocale) {
            if (item) {
                if (item.url) {
                    return `/${locale}/${item.url}`;
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
                    return `/${item.url}`;
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
