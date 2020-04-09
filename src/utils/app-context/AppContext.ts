import { createContext } from 'react';
import { AppContextProps } from '../../types/appContext';

export const AppContext = createContext<AppContextProps>({ locale: 'cs', absoluteLinks: false });
