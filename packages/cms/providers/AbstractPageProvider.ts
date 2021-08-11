import { AppData, BasePage } from '../types';
import AbstractProvider from './AbstractProvider';

export default abstract class AbstractPageProvider extends AbstractProvider {
    abstract getPageBySlug<P extends BasePage, W>(
        locale: string | undefined,
        slug: string[],
        preview?: boolean,
    ): Promise<AppData<P, W> | undefined>;
}
