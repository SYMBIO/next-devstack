import { createContext } from 'react';
import { AppContextProps } from '../../types/appContext';
import { i18n } from '../../../symbio.config.json';

export const AppContext = createContext<AppContextProps>({
    locale: i18n.defaultLocale,
    absoluteLinks: false,
});
