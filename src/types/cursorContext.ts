import { DragEventHandler, JSXElementConstructor, MouseEventHandler, ReactNode } from 'react';

export interface CursorEvents<T> {
    onAuxClick?: MouseEventHandler<T>;
    onClick?: MouseEventHandler<T>;
    onContextMenu?: MouseEventHandler<T>;
    onDoubleClick?: MouseEventHandler<T>;
    onDrag?: DragEventHandler<T>;
    onDragEnd?: DragEventHandler<T>;
    onDragEnter?: DragEventHandler<T>;
    onDragExit?: DragEventHandler<T>;
    onDragLeave?: DragEventHandler<T>;
    onDragOver?: DragEventHandler<T>;
    onDragStart?: DragEventHandler<T>;
    onDrop?: DragEventHandler<T>;
    onMouseDown?: MouseEventHandler<T>;
    onMouseEnter?: MouseEventHandler<T>;
    onMouseLeave?: MouseEventHandler<T>;
    onMouseMove?: MouseEventHandler<T>;
    onMouseOut?: MouseEventHandler<T>;
    onMouseOver?: MouseEventHandler<T>;
    onMouseUp?: MouseEventHandler<T>;
}

export interface CursorContextProps<T = JSXElementConstructor<any>> {
    addCursor: (el: HTMLElement, component: ReactNode) => void;
    removeCursor: (el: HTMLElement) => void;
}
