import React, { ReactElement } from 'react';
import condCls from '../../../utils/conditionalClasses';
import styles from './List.module.scss';

export interface ListProps {
    tag: 'ol' | 'ul';
    children: ReactElement[] | ReactElement;
}

const List = ({ tag, children }: ListProps): JSX.Element => {
    const Tag = tag;
    return <Tag className={condCls(styles.list, styles[tag])}>{children}</Tag>;
};

List.whyDidYouRender = true;

export { List };
