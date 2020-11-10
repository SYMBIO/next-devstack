import React, { ReactElement, useEffect, useRef, useContext } from 'react';
import styles from './CustomCursor.module.scss';
import condCls from '../../../utils/conditionalClasses';
import { CursorContext } from '../../../contexts/cursor-context/CursorContext';

export const CustomCursor = ({ className, component, targetRef }: any): ReactElement => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ctx = useContext(CursorContext);
    const Cursor = component;
    const elms: any[] = [];

    const handleMouseMove = (e: MouseEvent) => {
        e.stopPropagation();
        if (cursorRef?.current) {
            cursorRef.current.style.left = `${e.clientX.toString()}px`;
            cursorRef.current.style.top = `${e.clientY.toString()}px`;
        }
    };

    const addEventListeners = (el: any) => {
        el.addEventListener('mousemove', handleMouseMove);
    };

    const removeEventListeners = (el: any) => {
        el.removeEventListener('mousemove', handleMouseMove);
    };

    useEffect(() => {
        if (targetRef && targetRef.current) {
            elms.push({ [targetRef.current]: targetRef.current });
            addEventListeners(targetRef.current);
            return () => removeEventListeners(targetRef.current);
        }
    }, [targetRef]);

    useEffect(() => {
        console.log(elms);
    }, [elms]);

    return (
        <div ref={cursorRef} className={condCls(className, styles.wrapper)}>
            <Cursor />
        </div>
    );
};
