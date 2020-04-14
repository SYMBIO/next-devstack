import { AppData } from '../../types/app';

export abstract class AbstractPageCache {
    abstract async get(locale: string, pathParts: string[]): Promise<AppData>;

    async update(pathParts: string[]): Promise<void> {
        return;
    }

    async reset(): Promise<void> {
        return;
    }
}
