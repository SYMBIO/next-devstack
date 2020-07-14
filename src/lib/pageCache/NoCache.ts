import { AppData } from '../../types/app';
import { AbstractPageCache } from './AbstractPageCache';
import ProviderRegistry from '../provider/ProviderRegistry';
import PageProvider from '../../providers/PageProvider';

export class NoCache extends AbstractPageCache {
    async get(locale: string, pathParts: string[]): Promise<AppData> {
        const provider = ProviderRegistry.get('page') as PageProvider;
        return await provider.getPageBySlug(locale, pathParts);
    }

    async update(pathParts: string[]): Promise<void> {
        return;
    }

    async reset(): Promise<void> {
        return;
    }
}
