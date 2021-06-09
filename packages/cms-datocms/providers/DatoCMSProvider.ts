import { AbstractProvider, BaseRecord, CmsItem, FindOneParams, FindParams } from '@symbio/cms';
import { Environment, GraphQLTaggedNode, fetchQuery } from 'relay-runtime';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { DATOCMS_MAX_LIMIT } from '../constants';
import { FindOperationType, FindResponse, OneOperationType, ProviderOptions } from '../types';

export default class DatoCMSProvider<
    TOne extends OneOperationType,
    TFind extends FindOperationType,
> extends AbstractProvider {
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
    async findOne<TItem extends BaseRecord = TOne['response']['item']>(
        options: FindOneParams | FindParams<TFind['variables']>,
    ): Promise<CmsItem<TItem> | null> {
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

        const result = await fetchQuery<TOne>(this.getEnvironment(preview), this.node, variables).toPromise();

        if (!result?.item) {
            return null;
        }

        return await this.transformResult<TItem>(result.item as TItem, locale);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async find<TItem extends BaseRecord = TFind['response']['items'][number]>(
        options: FindParams<TFind['variables']>,
    ): Promise<FindResponse<TItem>> {
        const { preview, ...other } = options;
        const variables = {
            ...other,
            limit: Math.min(options.limit, DATOCMS_MAX_LIMIT),
            offset: 0,
            filter: options.filter ? { ...options.filter, ...this.getFilterParams() } : this.getFilterParams(),
        };

        const result = await fetchQuery<TFind>(this.getEnvironment(preview), this.findNode, variables).toPromise();

        if (!result) {
            return {
                count: 0,
                data: [],
            };
        }

        const count = result.meta.count;
        const data = [...result.items];

        if (options.limit > DATOCMS_MAX_LIMIT) {
            while (options.limit && data.length < count && result.items.length === DATOCMS_MAX_LIMIT) {
                variables.offset = data.length;
                const result = await fetchQuery<TFind>(
                    this.getEnvironment(preview),
                    this.findNode,
                    variables,
                ).toPromise();
                if (result) {
                    data.push(...result.items);
                }
            }
        }

        return {
            count,
            data: await this.transformResults<TItem>(data as ReadonlyArray<TItem>, options.locale),
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
