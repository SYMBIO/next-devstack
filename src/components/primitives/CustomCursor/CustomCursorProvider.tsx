import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
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
            zIndex: 99999999999,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
        }}
    >
        {/* eslint-disable-next-line react/prop-types */}
        {props.children}
    </div>
));

const cursors = new Map<EventTarget, ReactNode>();

export const CustomCursorProvider = ({ children }: CustomCursorProviderProps): ReactElement => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [activeCursor, setActiveCursor] = useState<ReactNode>();

    const addCursor = (componentEl: HTMLElement, cursor: ReactNode) => {
        componentEl.addEventListener('mouseenter', handleMouseEnter);
        componentEl.addEventListener('mouseleave', handleMouseLeave);
        cursors.set(componentEl, cursor);
    };

    const removeCursor = (componentEl: HTMLElement) => {
        componentEl.removeEventListener('mouseenter', handleMouseEnter);
        componentEl.removeEventListener('mouseleave', handleMouseLeave);
        cursors.delete(componentEl);
    };

    const handleMouseMove = (e: MouseEvent) => {
        e.stopPropagation();
        if (cursorRef?.current) {
            cursorRef.current.style.left = `${e.clientX.toString()}px`;
            cursorRef.current.style.top = `${e.clientY.toString()}px`;
        }
    };

    const handleMouseEnter = (e: MouseEvent) => {
        e.stopPropagation();
        if (e.target) {
            const nextCursor = cursors.get(e.target);
            if (nextCursor) {
                setActiveCursor(nextCursor);
            }
        }
    };

    const handleMouseLeave = (e: MouseEvent) => {
        e.stopPropagation();
        if (e.target) {
            const nextCursor = cursors.get(e.relatedTarget as EventTarget);
            if (nextCursor) {
                setActiveCursor(nextCursor);
            }
        }
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
            <CustomCursorRenderer ref={cursorRef}>{activeCursor}</CustomCursorRenderer>
            {children}
        </CursorContext.Provider>
    );
};
