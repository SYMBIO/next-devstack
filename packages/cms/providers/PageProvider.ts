import { AppData, BasePage } from '../types';
import AbstractProvider from './Provider';

export default interface PageProvider<P extends BasePage, W> extends AbstractProvider {
    getPageBySlug: (
        locale: string | undefined,
        slug: string[],
        preview?: boolean,
    ) => Promise<AppData<P, W> | undefined>;
}
