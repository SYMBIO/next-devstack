import { SlugAppQueryResponse } from '../relay/api/__generated__/SlugAppQuery.graphql';
import { RedirectRecord, Site, SiteLocale, WebSettingRecord } from './graphql';

export type WebSetting = SlugAppQueryResponse['webSetting'];

export type AppContextProps = WebSetting & {
    locale: SiteLocale;
    absoluteLinks: boolean;
    hostname?: string;
    currentUrl?: string;
    site?: Site;
    redirect?: RedirectRecord;
    page?: SlugAppQueryResponse['page'];
};
