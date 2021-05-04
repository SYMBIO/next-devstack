import Provider from './Provider';
import { Environment, GraphQLTaggedNode } from 'relay-runtime';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { OperationType } from 'relay-runtime/lib/util/RelayRuntimeTypes';
import { fetchQuery } from 'react-relay';
import { DATOCMS_MAX_LIMIT } from '../../constants';
import { sleep } from '../../utils/sleep';
import symbio from '../../../symbio.config.json';

export type DatoCMSRecord = {
    id: string;
    [key: string]: unknown;
} | null;

export interface FindResponse<T> {
    count: number;
    data: T;
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

    public constructor(node: GraphQLTaggedNode, findNode: GraphQLTaggedNode) {
        this.node = node;
        this.findNode = findNode;
    }

    protected getEnvironment(preview = false): Environment {
        return this.environment[preview ? 'preview' : 'production'];
    }

    public isLocalizable(): boolean {
        return true;
    }

    abstract getApiKey(): string;

    abstract getId(): string;

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

        const result = await fetchQuery<TOne>(this.getEnvironment(preview), this.node, variables).toPromise();

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
        ).toPromise()) as unknown) as {
            items: TItems;
            meta: { count: number };
        };

        const count = result.meta.count;
        const data: Mutable<TItems> = result.items;

        if (options.limit > DATOCMS_MAX_LIMIT) {
            while (options.limit && data.length < count && result.items.length === DATOCMS_MAX_LIMIT) {
                variables.offset = data.length;
                const result = ((await fetchQuery<TFind>(
                    this.getEnvironment(preview),
                    this.findNode,
                    variables,
                ).toPromise()) as unknown) as {
                    items: TItems;
                };
                data.push(...result.items);
                await sleep();
            }
        }

        return {
            count,
            data: data as TItems,
        };
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

    async getPreviewUrl(id: string, locale?: string): Promise<string | null> {
        const item = await this.findOne(id, locale);
        const { i18n } = symbio;
        if (locale !== i18n.defaultLocale) {
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
