import Provider from './Provider';
import { Environment, GraphQLTaggedNode } from 'relay-runtime';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { OperationType } from 'relay-runtime/lib/util/RelayRuntimeTypes';
import { fetchQuery } from 'react-relay';
import { DATOCMS_MAX_LIMIT } from '../../constants';
import { sleep } from '../../utils/sleep';

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

    async findOne(id: string, locale?: string, preview = false): Promise<TItem | null> {
        const variables: { filter: { id: { eq: string }; title: { exists: boolean } }; locale?: string } = {
            filter: {
                id: { eq: id },
                title: { exists: true },
                ...this.getFilterParams(),
            },
        };

        if (this.isLocalizable()) {
            variables.locale = locale;
        }

        const result = await fetchQuery<TOne>(this.getEnvironment(preview), this.node, variables);

        return (result as { item: TItem }).item;
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

        const result = (await fetchQuery<TFind>(this.getEnvironment(preview), this.findNode, variables)) as {
            items: TItems;
            meta: { count: number };
        };

        const count = result.meta.count;
        const data: Mutable<TItems> = result.items;

        if (options.limit > DATOCMS_MAX_LIMIT) {
            while (options.limit && data.length < count && result.items.length === DATOCMS_MAX_LIMIT) {
                variables.offset = data.length;
                const result = (await fetchQuery<TFind>(this.getEnvironment(preview), this.findNode, variables)) as {
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
}
