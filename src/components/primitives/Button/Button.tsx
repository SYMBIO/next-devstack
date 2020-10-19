import React from 'react';
import condCls from '../../../utils/conditionalClasses';
import { Link } from '../Link/Link';
import styles from './Button.module.scss';
import { Icon, Icons } from '../Icon/Icon';

enum IconPosition {
    Left = 'Left',
    Right = 'Right',
}

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
    iconPosition = IconPosition.Left,
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
                        {icon && iconPosition === IconPosition.Left && <Icon className={styles.icon} name={icon} />}
                        {children}
                        {icon && iconPosition === IconPosition.Right && <Icon className={styles.icon} name={icon} />}
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className={condCls(styles.wrapper, disabled && styles.disabled)} {...rest} onClick={onClick}>
                <button className={styles.innerButton} type={submit ? 'submit' : 'button'} disabled={disabled}>
                    {icon && iconPosition === IconPosition.Left && <Icon className={styles.icon} name={icon} />}
                    {children}
                    {icon && iconPosition === IconPosition.Right && <Icon className={styles.icon} name={icon} />}
                </button>
            </div>
        );
    }
};

Button.whyDidYouRender = true;

export { Button };
