import React from 'react';
import condCls from '../../../utils/conditionalClasses';
import { Link } from '../Link/Link';
import styles from './Button.module.scss';
import { Icon } from '../Icon/Icon';

export interface ButtonProps {
    children: string | JSX.Element | (string | JSX.Element | number)[];
    onClick?: () => void;
    href?: string;
    page?: { url: string | null } | null;
    icon?: string | undefined;
    params?: Record<string, string | number>;
    disabled?: boolean;
    external?: boolean;
    iconOnLeft?: boolean;
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
    iconOnLeft = false,
    ...rest
}: ButtonProps): JSX.Element =>
    href || page ? (
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
                    {iconOnLeft && icon && <Icon className={styles.icon} name={icon} />}
                    <>{children}</>
                    {!iconOnLeft && icon && <Icon className={styles.icon} name={icon} />}
                </Link>
            </div>
        </div>
    ) : (
        <div className={condCls(styles.wrapper, disabled && styles.disabled)} {...rest}>
            <button className={styles.innerButton} type={submit ? 'submit' : 'button'} disabled={disabled}>
                {iconOnLeft && icon && <Icon className={styles.icon} name={icon} />}
                {children}
                {!iconOnLeft && icon && <Icon className={styles.icon} name={icon} />}
            </button>
        </div>
    );

Button.whyDidYouRender = true;

export { Button };
