import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { CursorContext } from '../../../contexts/cursor-context/CursorContext';
import { CursorEvents } from '../../../types/cursorContext';

interface CustomCursorProviderProps {
    children: ReactNode;
}

// eslint-disable-next-line react/display-name
const CustomCursorRenderer = React.forwardRef<HTMLDivElement, CustomCursorProviderProps>((props, ref) => (
    <div
        ref={ref}
        style={{
            position: 'fixed',
            border: 'solid 1px red',
            zIndex: 100000,
            backgroundColor: 'blue',
            pointerEvents: 'none',
        }}
        className={'cursor'}
    >
        {/* eslint-disable-next-line react/prop-types */}
        {props.children}
    </div>
));

export const CustomCursorProvider = ({ children }: CustomCursorProviderProps): ReactElement => {
    const [cursor, setCursor] = useState<Array<React.FC<any>>>([]);
    const cursorRef = React.createRef<HTMLDivElement>();

    const buildEvents = (componentEl: HTMLElement): CursorEvents<any> => ({});

    const addCursor = (componentEl: HTMLElement, component: React.FC<any>) => {
        componentEl.classList.add('noCursor');
        componentEl.addEventListener('mouseenter', handleMouseEnter);
        componentEl.addEventListener('mouseleave', handleMouseLeave);
        return buildEvents(componentEl);
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const removeCursor = (componentEl: HTMLElement) => {
        componentEl.style.removeProperty('cursor');
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
