import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { BsPrefixAndClassNameOnlyProps } from 'react-bootstrap/helpers';
import { useBootstrapPrefix } from 'react-bootstrap/ThemeProvider';
import { Image, ImageProps } from '../Image/Image';

export interface CardImgProps extends ImageProps, BsPrefixAndClassNameOnlyProps {
    variant?: 'top' | 'bottom' | null;
}

export const CardImg = ({ bsPrefix, variant = null, className, ...props }: CardImgProps): ReactElement => {
    const prefix = useBootstrapPrefix(bsPrefix, 'card-img');

    return <Image className={classNames(variant ? `${prefix}-${variant}` : prefix, className)} {...props} />;
};
