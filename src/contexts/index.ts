import { combineContext } from '../utils/combineContexts';
import { AppContext } from './app-context/AppContext';

const providers = { appContext: AppContext };

export const ContextsProvider = combineContext(providers);
