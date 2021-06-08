export type DatoCMSRecord = {
    id: string;
    [key: string]: unknown;
} | null;

export interface FindResponse<T> {
    count: number;
    data: T;
}

export interface ProviderOptions {
    locales: string[];
    apiKey: string;
    id: string;
}
