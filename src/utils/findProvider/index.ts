import providers from '../../providers';

export function findProvider(typeId: string): typeof providers[keyof typeof providers] | undefined {
    let provider;
    const providerIndex = Object.keys(providers).indexOf(typeId);
    if (providerIndex === -1) {
        provider = Object.values(providers).find((p) => p.getId() === typeId || p.getApiKey() === typeId);
    } else {
        provider = Object.values(providers)[providerIndex];
    }
    return provider;
}
