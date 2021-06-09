import { AbstractSingletonProvider } from '@symbio/cms';
import { Environment, GraphQLTaggedNode, OperationType, fetchQuery } from 'relay-runtime';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { DatoCMSRecord, ProviderOptions } from '../types/provider';

export default class SingletonDatoCMSProvider<
    TOperation extends OperationType,
    TItem extends DatoCMSRecord = DatoCMSRecord,
> extends AbstractSingletonProvider<TItem> {
    protected environment: Record<string, Environment> = {
        preview: createRelayEnvironment({}, true),
        production: createRelayEnvironment({}, false),
    };

    protected node: GraphQLTaggedNode;

    protected options: ProviderOptions;

    public constructor(node: GraphQLTaggedNode, options: ProviderOptions) {
        super(options);
        this.environment = createRelayEnvironment({}, false);
        this.node = node;
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
     * Get item
     * @param options
     */
    async get(options?: { locale?: string; preview?: boolean }): Promise<TItem | null> {
        const result = await fetchQuery<TOperation>(
            this.getEnvironment(!!options?.preview),
            this.node,
            this.isLocalizable()
                ? {
                      locale: options?.locale,
                  }
                : {},
        );

        return await this.transformResult(result);
    }

    async transformResult(result: TOperation['response']): Promise<TItem | null> {
        if (result) {
            return (result as { item: TItem }).item;
        } else {
            return null;
        }
    }
}
