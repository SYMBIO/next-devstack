import { appQueryResponse } from '../relay/__generated__/appQuery.graphql';
import { RedirectRecord } from './graphql';
import { AppData } from './app';

export type WebSetting = appQueryResponse['webSetting'];

export type AppContextProps = Partial<WebSetting> & {
    locale: string;
    absoluteLinks: boolean;
    hostname?: string;
    currentUrl?: string;
    site?: AppData['site'];
    page?: AppData['page'];
    redirect?: RedirectRecord;
};
