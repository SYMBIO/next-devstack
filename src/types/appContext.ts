import { appQueryResponse } from '../relay/__generated__/appQuery.graphql';
import { RedirectRecord, Site, SiteLocale, WebSettingRecord } from './graphql';

export type WebSetting = appQueryResponse['webSetting'];

export type AppContextProps = WebSetting & {
    locale: SiteLocale;
    absoluteLinks: boolean;
    hostname?: string;
    currentUrl?: string;
    site?: Site;
    redirect?: RedirectRecord;
    page?: appQueryResponse['page'];
};
