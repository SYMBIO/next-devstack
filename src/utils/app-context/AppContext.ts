import { createContext } from 'react';
import { AppContextProps } from '../../types/appContext';
import symbio from '../../../symbio.config.json';

export const AppContext = createContext<AppContextProps>({
    locale: process.env.locale || symbio.locales[0],
    absoluteLinks: false,
});
