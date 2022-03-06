import { createContext } from 'react';
import { CursorContextProps } from '../../cursorContext';

export type CursorContextState = unknown;

export const CursorContext = createContext<CursorContextProps>({
    addCursor: () => ({}),
    removeUnusedCursors: () => ({}),
});
