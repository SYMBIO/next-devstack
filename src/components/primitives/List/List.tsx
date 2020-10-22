import React, { ReactElement } from 'react';
import condCls from '../../../utils/conditionalClasses';
import styles from './List.module.scss';

export interface ListProps {
    tag: 'ol' | 'ul';
    children: ReactElement[] | ReactElement;
}

const List = ({ tag, children }: ListProps): JSX.Element => {
    return (
        <span as={tag} className={condCls(styles.list, styles[tag])}>
            {children}
        </span>
    );
};

List.whyDidYouRender = true;

export { List };
