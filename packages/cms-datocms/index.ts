import { BaseRecord, CmsItem, SingletonBaseRecord } from '@symbio/cms';
import { Variables } from 'relay-runtime';
export * from './providers';

export type DatoCMSRecord = CmsItem<{
    id: string;
    [key: string]: unknown;
}>;

export interface FindResponse<T extends BaseRecord> {
    count: number;
    data: ReadonlyArray<CmsItem<T>>;
}

export interface ProviderOptions {
    locales: string[];
    apiKey: string;
    id: string;
}

export type SingletonOperationType = {
    readonly variables: Variables;
    readonly response: {
        item: SingletonBaseRecord;
    };
    readonly rawResponse?: unknown;
};

export type OneOperationType = {
    readonly variables: Variables;
    readonly response: {
        item: BaseRecord;
    };
    readonly rawResponse?: unknown;
};

export type FindOperationType = {
    readonly variables: Variables;
    readonly response: {
        items: ReadonlyArray<BaseRecord>;
        meta: {
            count: number;
        };
    };
    readonly rawResponse?: unknown;
};
