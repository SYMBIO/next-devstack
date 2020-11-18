import React, { ButtonHTMLAttributes } from 'react';
import { Page } from '../../../types/app';
import condCls from '../../../utils/conditionalClasses';
import { Link } from '../Link/Link';
import { Icon, Icons } from '../Icon/Icon';
import styles from './Button.module.scss';

type IconPosition = 'left' | 'right';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    page?: Page;
    params?: Record<string, string | number>;
    icon?: Icons;
    iconPosition?: IconPosition;
}

const Button = ({
    children,
    href,
    page,
    params,
    icon,
    iconPosition = 'left',
    disabled,
    type,
    ...rest
}: ButtonProps): JSX.Element => {
    if ((href || page) && type !== 'submit') {
        return (
            <div className={condCls(styles.button, styles.hasLink, disabled && styles.disabled)}>
                <Link className={styles.link} href={href} page={page} target={rest.target} params={params}>
                    {icon && iconPosition === 'left' && (
                        <Icon className={condCls(styles.icon, styles.iconOnLeft)} name={icon} />
                    )}
                    {children}
                    {icon && iconPosition === 'right' && (
                        <Icon className={condCls(styles.icon, styles.iconOnRight)} name={icon} />
                    )}
                </Link>
            </div>
        );
    } else {
        return (
            <button
                className={condCls(styles.button, disabled && styles.disabled)}
                type={type}
                disabled={disabled}
                {...rest}
            >
                {icon && iconPosition === 'left' && (
                    <Icon className={condCls(styles.icon, styles.iconOnLeft)} name={icon} />
                )}
                {children}
                {icon && iconPosition === 'right' && (
                    <Icon className={condCls(styles.icon, styles.iconOnRight)} name={icon} />
                )}
            </button>
        );
    }
};

Button.whyDidYouRender = true;

export { Button };
