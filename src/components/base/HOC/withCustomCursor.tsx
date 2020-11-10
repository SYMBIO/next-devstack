import React, { useRef, useEffect, useState } from 'react';
import { CustomCursor } from '../../primitives/CustomCursor/CustomCursor';

const withCustomCursor = (Component: any, Cursor: any): any => {
    const EnhancedComponent = (props) => {
        const targetRef = useRef(null);
        const [target, setTarget] = useState<React.MutableRefObject<null> | null>(null);

        useEffect(() => {
            targetRef && setTarget(targetRef);
        }, [targetRef]);

        return (
            <div ref={targetRef}>
                <Component {...props} />
                <CustomCursor component={Cursor} targetRef={target} />
            </div>
        );
    };
    return EnhancedComponent;
};

export default withCustomCursor;
