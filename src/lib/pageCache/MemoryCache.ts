import { AppData } from '../../types/app';
import { SiteLocale } from '../../types/graphql';
import { NoCache } from './NoCache';

const data: Record<string, AppData> = {};

export class MemoryCache extends NoCache {
    private static getKey(locale: string, pathParts: string[]): string {
        return `${pathParts.join('_')}_${locale}`;
    }

    async get(locale: string, pathParts: string[]): Promise<AppData> {
        const key = MemoryCache.getKey(locale, pathParts);
        if (!data[key]) {
            data[key] = await super.get(locale, pathParts);
        }
        return data[key];
    }

    async update(pathParts: string[]): Promise<void> {
        for (const locale in SiteLocale) {
            if (Object.prototype.hasOwnProperty.call(SiteLocale, locale)) {
                const key = MemoryCache.getKey(locale, pathParts);
                data[key] = await super.get(locale, pathParts);
            }
        }
    }

    async reset(): Promise<void> {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                delete data[key];
            }
        }
        return;
    }
}
