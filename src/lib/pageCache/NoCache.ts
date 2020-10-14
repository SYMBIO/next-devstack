import { AppData } from '../../types/app';
import { AbstractPageCache } from './AbstractPageCache';
import providers from '../../providers';

export class NoCache extends AbstractPageCache {
    async get(locale: string, pathParts: string[]): Promise<AppData> {
        const provider = providers.page;
        return await provider.getPageBySlug(locale, pathParts);
    }

    async update(pathParts: string[]): Promise<void> {
        return;
    }

    async reset(): Promise<void> {
        return;
    }
}
