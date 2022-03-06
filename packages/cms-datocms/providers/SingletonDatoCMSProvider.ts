import { AbstractSingletonProvider, SingletonBaseRecord } from '@symbio/cms';
import { Environment, GraphQLTaggedNode, fetchQuery } from 'relay-runtime';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { ProviderOptions, SingletonOperationType } from '../index';

export default class SingletonDatoCMSProvider<TOne extends SingletonOperationType> extends AbstractSingletonProvider {
    protected environment: Record<string, Environment> = {
        preview: createRelayEnvironment({}, true),
        production: createRelayEnvironment({}, false),
    };

    protected node: GraphQLTaggedNode;

    protected options: ProviderOptions;

    public constructor(node: GraphQLTaggedNode, options: ProviderOptions) {
        super(options);
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
    async get<TItem extends SingletonBaseRecord = TOne['response']['item']>(options?: {
        locale?: string;
        preview?: boolean;
    }): Promise<TItem | null> {
        const result = await fetchQuery<TOne>(
            this.getEnvironment(!!options?.preview),
            this.node,
            this.isLocalizable()
                ? {
                      locale: options?.locale,
                  }
                : {},
        ).toPromise();

        if (!result?.item) {
            return null;
        }

        return await this.transformResult<TItem>(result.item as TItem);
    }
}
