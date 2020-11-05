import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import styles from './CustomCursor.module.scss';

interface CustomCursorProps {
    children?: ReactNode;
}

export const CustomCursor = ({ children }: CustomCursorProps): ReactElement => {
    const cursorRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        if (cursorRef && cursorRef.current) {
            cursorRef.current.style.left = `${e.clientX.toString()}px`;
            cursorRef.current.style.top = `${e.clientY.toString()}px`;
        }
    };

    const handleMouseEnter = (e: MouseEvent) => {
        alert('enter');
    };

    const handleMouseClick = (e: MouseEvent) => {
        alert('click');
    };

    const addEventListeners = () => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseClick);
        window.addEventListener('mouseenter', handleMouseEnter);
    };

    const removeEventListeners = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseClick);
        window.removeEventListener('mouseenter', handleMouseEnter);
    };

    useEffect(() => {
        addEventListeners();
        return () => removeEventListeners();
    }, []);

    return (
        <div ref={cursorRef} className={styles.wrapper} style={{ left: 0, top: 0 }}>
            {children}
        </div>
    );
};
