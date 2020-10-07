import React from 'react';
import { Icon, Link } from '..';
import styles from './Button.module.scss';

interface Props {
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
}: Props): JSX.Element =>
    href || page ? (
        <div className={styles.wrapper} disabled={disabled} {...rest} target={external ? '_blank' : '_self'}>
            <div className={styles.inner}>
                <Link
                    className={styles.link}
                    href={href}
                    page={{ url: (page && page.url) || '' }}
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
        <div className={styles.wrapper} disabled={disabled} {...rest} target={external ? '_blank' : '_self'}>
            <button className={styles.innerButton} type={submit ? 'submit' : 'button'}>
                {iconOnLeft && icon && <Icon className={styles.icon} name={icon} />}
                {children}
                {!iconOnLeft && icon && <Icon className={styles.icon} name={icon} />}
            </button>
        </div>
    );

Button.whyDidYouRender = true;

export { Button };
