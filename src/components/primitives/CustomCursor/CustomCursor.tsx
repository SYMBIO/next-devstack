import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import styles from './CustomCursor.module.scss';

const BIG_SIZE = '3rem';
const SMALL_SIZE = '1.5rem';
const HOVER_BG_COLOR = '#ff6600';
const DEFAULT_BG_COLOR = 'transparent';

interface CustomCursorProps {
    children?: ReactNode;
}

export const CustomCursor = ({ children }: CustomCursorProps): ReactElement => {
    const cursorRef = useRef<HTMLDivElement>(null);
    let clickables: NodeListOf<Element> | [] = [];

    const setBackground = (color: string) => {
        if (cursorRef && cursorRef.current) {
            cursorRef.current.style.background = color;
            cursorRef.current.style.width = BIG_SIZE;
            cursorRef.current.style.height = BIG_SIZE;
        }
    };
    const setTransparentBackground = () => setBackground(DEFAULT_BG_COLOR);
    const setSolidBackground = () => setBackground(HOVER_BG_COLOR);

    const handleMouseMove = (e: MouseEvent) => {
        if (cursorRef && cursorRef.current) {
            cursorRef.current.style.left = `${e.clientX.toString()}px`;
            cursorRef.current.style.top = `${e.clientY.toString()}px`;
        }
    };

    const handleMouseDown = () => {
        if (cursorRef && cursorRef.current) {
            cursorRef.current.style.width = SMALL_SIZE;
            cursorRef.current.style.height = SMALL_SIZE;
        }
    };

    const handleMouseUp = () => {
        if (cursorRef && cursorRef.current) {
            cursorRef.current.style.width = BIG_SIZE;
            cursorRef.current.style.height = BIG_SIZE;
        }
    };

    const addEventListeners = () => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('click', handleMouseUp);
        window.addEventListener('mouseup', handleMouseUp);

        clickables.forEach((el: Element) => {
            el.addEventListener('mouseover', setSolidBackground);
            el.addEventListener('mouseout', setTransparentBackground);
        });
    };

    const removeEventListeners = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('click', handleMouseUp);
        window.removeEventListener('mouseup', handleMouseUp);

        clickables.forEach((el: Element) => {
            el.removeEventListener('mouseover', setSolidBackground);
            el.removeEventListener('mouseout', setTransparentBackground);
        });
    };

    useEffect(() => {
        clickables = document.querySelectorAll('a, input[type="submit"], label[for], select, button, .link');

        if (cursorRef && cursorRef.current) {
            cursorRef.current.style.width = BIG_SIZE;
            cursorRef.current.style.height = BIG_SIZE;
            document.body.style.cursor = 'none';
        }

        addEventListeners();
        return () => removeEventListeners();
    }, []);

    return (
        <div ref={cursorRef} className={styles.wrapper} style={{ left: 0, top: 0 }}>
            {children}
        </div>
    );
};
