import React, { ReactElement, useEffect, useRef } from 'react';
import styles from './CustomCursor.module.scss';

const BIG_SIZE = '3rem';
const SMALL_SIZE = '1.5rem';
const HOVER_BG_COLOR = '#ff6600';
const DEFAULT_BG_COLOR = 'transparent';

export const CustomCursor = ({ component, targetRef }: any): ReactElement => {
    console.log(targetRef);
    const cursorRef = useRef<HTMLDivElement>(null);
    let pointerElements: NodeListOf<Element> | [] = [];

    const setBackground = (color: string) => {
        if (cursorRef?.current) {
            cursorRef.current.style.background = color;
            cursorRef.current.style.width = BIG_SIZE;
            cursorRef.current.style.height = BIG_SIZE;
        }
    };

    const setTransparentBackground = () => setBackground(DEFAULT_BG_COLOR);
    const setSolidBackground = () => setBackground(HOVER_BG_COLOR);

    const handleMouseMove = (e: MouseEvent) => {
        if (cursorRef?.current) {
            cursorRef.current.style.left = `${e.clientX.toString()}px`;
            cursorRef.current.style.top = `${e.clientY.toString()}px`;
        }
    };

    const handleMouseDown = () => {
        if (cursorRef?.current) {
            cursorRef.current.style.width = SMALL_SIZE;
            cursorRef.current.style.height = SMALL_SIZE;
        }
    };

    const handleMouseUp = () => {
        if (cursorRef?.current) {
            cursorRef.current.style.width = BIG_SIZE;
            cursorRef.current.style.height = BIG_SIZE;
        }
    };

    const addEventListeners = (el: any) => {
        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mousedown', handleMouseDown);
        el.addEventListener('mouseup', handleMouseUp);
    };

    const removeEventListeners = (el: any) => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mousedown', handleMouseDown);
        el.removeEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        pointerElements = document.querySelectorAll('a, input[type="submit"], label[for], select, button, .link');

        if (cursorRef?.current) {
            cursorRef.current.style.width = BIG_SIZE;
            cursorRef.current.style.height = BIG_SIZE;
            document.body.style.cursor = 'none';
        }

        if (targetRef && targetRef.current) {
            addEventListeners(targetRef.current);
            return () => removeEventListeners(targetRef.current);
        }
    }, []);

    const Cursor = component;

    return (
        <div ref={cursorRef} className={styles.wrapper}>
            <Cursor />
        </div>
    );
};
