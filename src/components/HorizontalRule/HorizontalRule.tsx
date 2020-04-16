import React, { ReactElement, ReactNode } from 'react';
import styles from './HorizontalRule.module.scss';

// export interface HorizontalRuleProps {
//     children: ReactNode;
// }

export const HorizontalRule = (): ReactElement | null => {
    return <hr className={styles.hr} />;
};
