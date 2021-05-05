import { AppData, BasePage } from './app';

export type AppContextProps<P extends BasePage, W> = AppData<P, W> & {
    hostname?: string;
    currentUrl?: string;
    item?: {
        id: string;
        title: string | null;
        _status: 'draft' | 'published' | 'updated';
        _seoMetaTags: ReadonlyArray<{
            tag: string;
            content: string | null;
            attributes: unknown | null;
        }>;
    };
};
