import { AppData, BasePage, Provider } from '../types';

export default interface PageProvider<P extends BasePage, W> extends Provider {
    getPageBySlug: (
        locale: string | undefined,
        slug: string[],
        preview?: boolean,
    ) => Promise<AppData<P, W> | undefined>;
}
