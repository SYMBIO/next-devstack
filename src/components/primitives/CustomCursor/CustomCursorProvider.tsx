import React, { ReactElement, ReactNode, RefObject, useEffect, useState } from 'react';
import { CursorContext } from '../../../contexts/cursor-context/CursorContext';
import { CursorEvents } from '../../../types/cursorContext';

interface CustomCursorRendererProps {
    ref: RefObject<HTMLDivElement>;
    children: ReactNode;
}

interface CustomCursorProviderProps {
    children: ReactNode;
}

const CustomCursorRenderer = ({ ref, children }: CustomCursorRendererProps) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                border: 'solid 1px red',
                zIndex: 100000,
                backgroundColor: 'blue',
            }}
            className={'cursor'}
        >
            {children}
        </div>
    );
};

export const CustomCursorProvider = ({ children }: CustomCursorProviderProps): ReactElement => {
    const [cursor, setCursor] = useState<Array<React.FC<any>>>([]);
    const cursorRef = React.createRef<HTMLDivElement>();

    const buildEvents = (componentEl: HTMLElement): CursorEvents<any> => ({});

    const addCursor = (componentEl: HTMLElement, component: React.FC<any>) => {
        componentEl.addEventListener('mouseenter', handleMouseEnter);
        componentEl.addEventListener('mouseleave', handleMouseLeave);
        return buildEvents(componentEl);
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const removeCursor = (componentEl: HTMLElement) => {
        componentEl.removeEventListener('mouseenter', handleMouseEnter);
        componentEl.removeEventListener('mouseleave', handleMouseLeave);
    };

    const handleMouseMove = (e: MouseEvent) => {
        e.stopPropagation();
        if (cursorRef?.current) {
            cursorRef.current.style.left = `${e.clientX.toString()}px`;
            cursorRef.current.style.top = `${e.clientY.toString()}px`;
        }
    };

    const handleMouseEnter = (e: MouseEvent) => {
        console.log('handleMouseEnter', e.target);
        e.stopPropagation();
    };

    const handleMouseLeave = (e: MouseEvent) => {
        console.log('handleMouseLeave', e.target);
        e.stopPropagation();
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <CursorContext.Provider
            value={{
                addCursor,
                removeCursor,
            }}
        >
            {cursor && <CustomCursorRenderer ref={cursorRef}>a</CustomCursorRenderer>}
            {children}
        </CursorContext.Provider>
    );
};
