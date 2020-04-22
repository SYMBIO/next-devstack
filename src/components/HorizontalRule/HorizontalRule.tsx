import React, { ReactElement } from 'react';
import styles from './HorizontalRule.module.scss';

export const HorizontalRule = (): ReactElement | null => {
    return <hr className={styles.hr} />;
};
