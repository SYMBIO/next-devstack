import { createContext } from 'react';
import { getSiteLocale } from '../../lib/routing/getSiteLocale';
import { AppContextProps } from '../../types/appContext';

export const AppContext = createContext<AppContextProps>({
    locale: getSiteLocale(),
    absoluteLinks: false,
    site: {
        faviconMetaTags: [],
    },
    logo: null,
    mainMenu: null,
    homepage: null,
    newsPage: null,
    footerMenu: null,
    formErrors: null,
});
