import React, { ReactNode } from 'react';
import styles from './List.module.scss';

interface Props {
    tag: 'ol' | 'ul';
    children: ReactNode;
}

const List = ({ tag, children }: Props): JSX.Element => {
    const CustomTag = tag;
    const classes = styles.list + ' ' + styles[tag];

    return <CustomTag className={classes}>{children}</CustomTag>;
};

List.whyDidYouRender = true;

export { List };
