import { appQueryResponse, ItemStatus } from '../relay/__generated__/appQuery.graphql';
import { AppData } from './app';

export type WebSetting = appQueryResponse['webSetting'];

export type AppContextProps = Partial<WebSetting> & {
    absoluteLinks?: boolean;
    hostname?: string;
    currentUrl?: string;
    site?: AppData['site'];
    page?: AppData['page'];
    item?: {
        id: string;
        title: string | null;
        _status: ItemStatus;
        _seoMetaTags: ReadonlyArray<{
            tag: string;
            content: string | null;
            attributes: unknown | null;
        }>;
    };
};
