import { createContext } from 'react';

export type CursorContextState = unknown;

export const cursorDefaultValue = {
    state: {},
    setState: (state: CursorContextState): any => {
        // setState
    },
};

export const CursorContext = createContext(cursorDefaultValue);
