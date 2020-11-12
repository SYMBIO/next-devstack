import { createContext } from 'react';
import { CursorContextProps } from '../../types/cursorContext';

export type CursorContextState = unknown;

export const CursorContext = createContext<CursorContextProps>({
    addCursor: () => ({}),
    removeCursor: () => ({}),
});
