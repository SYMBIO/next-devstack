import React, { ReactElement } from 'react';
import styles from './HorizontalRule.module.scss';

const HorizontalRule = (): ReactElement | null => {
    return <hr className={styles.hr} />;
};

HorizontalRule.whyDidYouRender = true;

export { HorizontalRule };
