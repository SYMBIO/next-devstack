import Provider from './Provider';

const providersByApiKey = new Map<string, Provider>();
const providersById = new Map<string, Provider>();

const ProviderRegistry = {
    all(): Provider[] {
        return Array.from(providersById.values());
    },
    get(keyOrId: string): Provider | undefined {
        if (providersByApiKey.has(keyOrId)) {
            return providersByApiKey.get(keyOrId);
        }
        if (providersById.has(keyOrId)) {
            return providersById.get(keyOrId);
        }
        throw new Error('Provider ' + keyOrId + ' not found!');
    },
    set(provider: Provider): void {
        providersById.set(provider.getId(), provider);
        providersByApiKey.set(provider.getApiKey(), provider);
    },
};

export default ProviderRegistry;
