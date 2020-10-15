import Provider, { FindResponse } from './Provider';
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

export default abstract class AbstractDatoCMSProvider<
    TOne extends OperationType,
    TFind extends OperationType,
    TItem extends DatoCMSRecord = DatoCMSRecord
> implements Provider {
    protected environment: Environment;

    protected node: GraphQLTaggedNode;

    protected findNode: GraphQLTaggedNode;

    public constructor(node: GraphQLTaggedNode, findNode: GraphQLTaggedNode) {
        this.environment = createRelayEnvironment({}, false);
        this.node = node;
        this.findNode = findNode;
    }

    public isLocalizable(): boolean {
        return true;
    }

    abstract getApiKey(): string;

    abstract getId(): string;

    async findOne(id: string, locale?: string): Promise<TItem | null> {
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

        const result = await fetchQuery<TOne>(this.environment, this.node, variables);

        return (result as { item: TItem }).item;
    }

    async find(options: Omit<TFind['variables'], 'locale'> & { locale?: string }): Promise<FindResponse<TItem>> {
        const data: TItem[] = [];

        const variables = {
            ...options,
            limit: Math.min(options.limit, DATOCMS_MAX_LIMIT),
            offset: data.length,
            filter: options.filter ? { ...options.filter, ...this.getFilterParams() } : this.getFilterParams(),
        };

        if (this.isLocalizable()) {
            variables.locale = options.locale;
        }

        const result = (await fetchQuery<TFind>(this.environment, this.findNode, variables)) as {
            items: TItem[];
            meta: { count: number };
        };

        const count = result.meta.count;
        data.push(...result.items);

        if (options.limit > DATOCMS_MAX_LIMIT) {
            while (options.limit && data.length < count && result.items.length === DATOCMS_MAX_LIMIT) {
                variables.offset = data.length;
                const result = (await fetchQuery<TFind>(this.environment, this.findNode, variables)) as {
                    items: TItem[];
                };
                data.push(...result.items);
                await sleep();
            }
        }

        return {
            count,
            data,
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
