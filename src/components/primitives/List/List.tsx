import React, { ReactElement } from 'react';
import condCls from '../../../utils/conditionalClasses';
import styles from './List.module.scss';

export interface ListI {
    tag: 'ol' | 'ul';
    children: ReactElement[] | ReactElement;
}

const List = ({ tag, children }: ListI): JSX.Element => {
    return (
        <span as={tag} className={condCls(styles.list, styles[tag])}>
            {children}
        </span>
    );
};

List.whyDidYouRender = true;

export { List };
