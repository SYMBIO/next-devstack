import React, { ReactElement, ReactNode, RefObject, useContext, useEffect } from 'react';
import { CursorContext } from '../../../contexts/cursor-context/CursorContext';

interface CustomCursorProps {
    component: ReactNode;
    children: (ref: RefObject<any>) => ReactElement;
}

export const CustomCursor = ({ component, children }: CustomCursorProps): ReactElement => {
    const { addCursor, removeCursor } = useContext(CursorContext);
    const ref = React.useRef<HTMLElement>();

    useEffect(() => {
        if (ref.current) {
            addCursor(ref.current, component);
        }
        return () => {
            ref.current && removeCursor(ref.current);
        };
    }, [ref]);

    return children(ref);
};
