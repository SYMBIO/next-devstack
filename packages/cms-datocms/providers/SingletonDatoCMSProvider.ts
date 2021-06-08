import { Environment, GraphQLTaggedNode, OperationType, fetchQuery } from 'relay-runtime';
import { Provider } from '@symbio/cms';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { ProviderOptions } from '../types/provider';

export default class SingletonDatoCMSProvider<TOperation extends OperationType> implements Provider {
    protected environment: Record<string, Environment> = {
        preview: createRelayEnvironment({}, true),
        production: createRelayEnvironment({}, false),
    };

    protected node: GraphQLTaggedNode;

    protected options: ProviderOptions;

    public constructor(node: GraphQLTaggedNode, options: ProviderOptions) {
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
     * Get one item by id
     * @param locale
     * @param preview
     */
    async get(locale?: string, preview = false): Promise<unknown | null> {
        const result = await fetchQuery<TOperation>(
            this.getEnvironment(preview),
            this.node,
            this.isLocalizable()
                ? {
                      locale,
                  }
                : {},
        );

        return await this.transformResult(result);
    }

    async transformResult(result: TOperation['response']): Promise<unknown> {
        return (result as { item: unknown }).item;
    }
}
