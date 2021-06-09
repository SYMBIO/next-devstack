import { CmsItem } from '@symbio/cms';

export type DatoCMSRecord = CmsItem & {
    id: string;
    [key: string]: unknown;
};

export interface FindResponse<T> {
    count: number;
    data: T;
}

export interface ProviderOptions {
    locales: string[];
    apiKey: string;
    id: string;
}
