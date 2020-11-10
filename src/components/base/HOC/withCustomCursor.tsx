import React from 'react';
import { CustomCursor } from '../../primitives/CustomCursor/CustomCursor';

const withCustomCursor = (Component: any, Cursor: any): any => {
    const EnhancedComponent = (props) => {
        return (
            <div>
                <Component {...props} />
                <CustomCursor component={Cursor} />
            </div>
        );
    };
    return EnhancedComponent;
};

export default withCustomCursor;
