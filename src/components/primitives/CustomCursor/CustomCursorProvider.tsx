import React, { ReactElement, ReactNode, useEffect, useRef, useState, forwardRef } from 'react';
import styles from './CustomCursorProvider.module.scss';
import { CursorContext } from '../../../contexts/cursor-context/CursorContext';

interface CustomCursorProviderProps {
    children: ReactNode;
}

// eslint-disable-next-line react/display-name
const CustomCursorRenderer = forwardRef<HTMLDivElement, CustomCursorProviderProps>((props, ref) => (
    <div ref={ref} className={styles.wrapper}>
        {/* eslint-disable-next-line react/prop-types */}
        {props.children}
    </div>
));

const cursors = new Map<EventTarget, ReactNode>();

export const CustomCursorProvider = ({ children }: CustomCursorProviderProps): ReactElement => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const mouseEnterStack: Array<EventTarget> = [];
    const [activeCursor, setActiveCursor] = useState<ReactNode>();

    const addCursor = (componentEl: HTMLElement, cursor: ReactNode) => {
        componentEl.addEventListener('mouseenter', handleMouseEnter);
        componentEl.addEventListener('mouseleave', handleMouseLeave);
        componentEl.classList.add('customCursor');
        cursors.set(componentEl, cursor);
    };

    const removeCursor = (componentEl: HTMLElement) => {
        componentEl.removeEventListener('mouseenter', handleMouseEnter);
        componentEl.removeEventListener('mouseleave', handleMouseLeave);
        componentEl.classList.remove('customCursor');
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
                if (mouseEnterStack[mouseEnterStack.length - 1] !== e.target) {
                    mouseEnterStack.push(e.target);
                }
                setActiveCursor(nextCursor);
            }
        }
    };

    const handleMouseLeave = (e: MouseEvent) => {
        e.stopPropagation();
        let nextCursor;
        if (mouseEnterStack.length > 1) {
            mouseEnterStack.pop();
            const nextEl = mouseEnterStack[mouseEnterStack.length - 1];
            if (nextEl) {
                nextCursor = cursors.get(nextEl);
            }
        }
        if (nextCursor) {
            setActiveCursor(nextCursor);
        } else {
            setActiveCursor(null);
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
