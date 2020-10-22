import React from 'react';
import condCls from '../../../utils/conditionalClasses';
import { Link } from '../Link/Link';
import styles from './Button.module.scss';
import { Icon, Icons } from '../Icon/Icon';

type IconPosition = 'left' | 'right';

export interface ButtonProps {
    children: string | JSX.Element | (string | JSX.Element | number)[];
    onClick?: () => void;
    href?: string;
    page?: { url: string | null } | null;
    icon?: Icons;
    params?: Record<string, string | number>;
    disabled?: boolean;
    external?: boolean;
    iconPosition?: IconPosition;
    submit?: boolean;
}

const Button = ({
    children,
    href,
    page,
    params,
    disabled,
    icon,
    external,
    submit,
    onClick,
    iconPosition = 'left',
    ...rest
}: ButtonProps): JSX.Element => {
    if (href || page) {
        return (
            <div className={condCls(styles.wrapper, disabled && styles.disabled)} {...rest}>
                <div className={styles.inner}>
                    <Link
                        className={styles.link}
                        href={href}
                        page={{ url: (page && page.url) || '' }}
                        target={external ? '_blank' : '_self'}
                        params={params}
                        plain
                    >
                        {icon && iconPosition === 'left' && (
                            <Icon className={condCls(styles.icon, styles.iconOnLeft)} name={icon} />
                        )}
                        {children}
                        {icon && iconPosition === 'right' && (
                            <Icon className={condCls(styles.icon, styles.iconOnRight)} name={icon} />
                        )}
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className={condCls(styles.wrapper, disabled && styles.disabled)} {...rest} onClick={onClick}>
                <button className={styles.innerButton} type={submit ? 'submit' : 'button'} disabled={disabled}>
                    {icon && iconPosition === 'left' && (
                        <Icon className={condCls(styles.icon, styles.iconOnLeft)} name={icon} />
                    )}
                    {children}
                    {icon && iconPosition === 'right' && (
                        <Icon className={condCls(styles.icon, styles.iconOnRight)} name={icon} />
                    )}
                </button>
            </div>
        );
    }
};

Button.whyDidYouRender = true;

export { Button };
