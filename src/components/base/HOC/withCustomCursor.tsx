import React, { useRef, useEffect, useState } from 'react';
import { CustomCursor } from '../../primitives/CustomCursor/CustomCursor';
import styles from './withCustomCursor.module.scss';

const withCustomCursor = (Component: any, Cursor: any): any => {
    const EnhancedComponent = (props) => {
        const targetRef = useRef(null);
        const [target, setTarget] = useState<React.MutableRefObject<null> | null>(null);

        useEffect(() => {
            targetRef && setTarget(targetRef);
        }, [targetRef]);

        return (
            <div className={styles.wrapper} ref={targetRef}>
                <Component {...props} />
                <CustomCursor className={styles.cursor} component={Cursor} targetRef={target} />
            </div>
        );
    };
    return EnhancedComponent;
};

export default withCustomCursor;
