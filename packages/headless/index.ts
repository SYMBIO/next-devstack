import { AppData, BasePage } from '@symbio/cms';
import { BlocksPropsMap } from './lib/blocks';

export type OmitRefType<T> = Omit<T, ' $refType'>;

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

export interface MyPageProps<P extends BasePage, W> extends AppData<P, W> {
    hostname: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocksPropsMap?: BlocksPropsMap;
    preview?: boolean;
    showGrid?: boolean;
}

export type IndexingRelations = Record<string, Record<string, Array<string>>>;

export * from './cursorContext';
export * from './lib/constants';
export * from './lib/blocks';
export * from './lib/logger';
export * from './lib/routing';
export { AppStore } from './lib/store/AppStore';
