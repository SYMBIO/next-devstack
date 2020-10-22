import { AppContext } from './app-context/AppContext';
import { combineContext } from '../utils/combineContexts';

const providers = { appContext: AppContext };

export const ContextsProvider = combineContext(providers);
