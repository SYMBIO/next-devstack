/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

declare module 'react-responsive-carousel' {
    export type Axis = 'horizontal' | 'vertical';

    export type CarouselCallback = (index: number, item: React.ReactNode) => void;

    export type StatusFormatter = (current: number, total: number) => string;

    export interface CarouselProps {
        className?: string;
        showArrows?: boolean;
        showStatus?: boolean;
        showIndicators?: boolean;
        showThumbs?: boolean;
        infiniteLoop?: boolean;
        selectedItem?: number;
        axis?: Axis;
        onChange?: CarouselCallback;
        onClickItem?: CarouselCallback;
        onClickThumb?: CarouselCallback;
        width?: string;
        useKeyboardArrows?: boolean;
        autoPlay?: boolean;
        stopOnHover?: boolean;
        interval?: number;
        transitionTime?: number;
        swipeable?: boolean;
        swipeScrollTolerance?: number;
        dynamicHeight?: boolean;
        emulateTouch?: boolean;
        statusFormatter?: StatusFormatter;
        children?: React.ReactNode;
        centerMode?: boolean;
        centerSlidePercentage?: number;
        renderArrowPrev?: (onClickHandler: () => void, hasPrev: boolean, label: string) => React.ReactNode;
        renderArrowNext?: (onClickHandler: () => void, hasNext: boolean, label: string) => React.ReactNode;
        renderIndicator?: (
            onClickHandler: () => void,
            isSelected: boolean,
            index: number,
            label: string,
        ) => React.ReactNode;
        renderItem?: (item: React.ReactNode, props: { isSelected: boolean }) => React.ReactNode;
        renderThumbs?: (children: React.ReactChildren) => React.ReactChildren;
    }

    export interface CarouselState {
        initialized: boolean;
        selectedItem: number;
        hasMount: boolean;
        itemSize: number;
        wrapperSize: number;
        cancelClick: boolean;
        swiping: boolean;
        autoPlay: boolean;
    }

    export class Carousel extends React.Component<CarouselProps, CarouselState> {
        constructor(props: CarouselProps, context: any);
        render(): JSX.Element;
    }

    export interface ThumbsProps {
        transitionTime?: number;
        selectedItem?: number;
        axis?: Axis;
    }

    export interface ThumbState {
        initialized: boolean;
        selectedItem: number;
        hasMount: boolean;
        firstItem: number;
        images?: HTMLImageElement[];
    }

    export class Thumbs extends React.Component<ThumbsProps, ThumbState> {
        constructor(props: ThumbsProps, context: any);
        render(): JSX.Element;
    }
}
