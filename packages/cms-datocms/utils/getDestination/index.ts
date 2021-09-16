import { AbstractProvider, Provider } from '@symbio/cms';

interface getDestinationProps {
    locale: string;
    id: string;
    provider?: Provider;
}

export default async function getDestination({ locale, id, provider }: getDestinationProps): Promise<string> {
    if (provider instanceof AbstractProvider) {
        return (await provider.getPreviewUrl(id, locale)) || `/${locale || ''}`;
    }

    return `/${locale || ''}`;
}