import { ProviderOptions } from './AbstractDatoCMSProvider';
import Provider from './Provider';
import { Environment, GraphQLTaggedNode } from 'relay-runtime';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { OperationType } from 'relay-runtime/lib/util/RelayRuntimeTypes';
import { fetchQuery } from 'react-relay';
import { getSiteLocale } from '../routing/getSiteLocale';

export default abstract class AbstractSingletonDatoCMSProvider<TOperation extends OperationType> implements Provider {
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
                      locale: getSiteLocale(locale),
                  }
                : {},
        );

        return await this.transformResult(result);
    }

    async transformResult(result: TOperation['response']): Promise<unknown> {
        return (result as { item: unknown }).item;
    }
}
