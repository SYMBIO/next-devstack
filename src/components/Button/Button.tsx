/* eslint-disable */
import React, { RefObject } from 'react';
import { Icon, Link } from '../';
import styles from './Button.module.scss';

interface Props {
    children: string | JSX.Element | (string | JSX.Element | number)[];
    className?: string;
    center?: boolean;
    onClick?: () => void;
    as?: any /* todo: problems with as prop, find better solution than any */;
    href?: string;
    page?: { url: string | null } | null;
    icon?: string | undefined;
    params?: Record<string, string | number>;
    disabled?: boolean;
    simple?: boolean;
    uppercase?: boolean;
    sans?: boolean;
    external?: boolean;
    iconOnLeft?: boolean;
    submit?: boolean;
    customRef?: RefObject<HTMLButtonElement>;
    isFilterButton?: boolean;
}

export const Button = ({
    children,
    href,
    page,
    params,
    disabled,
    icon,
    simple,
    uppercase,
    sans,
    external,
    submit,
    iconOnLeft = false,
    isFilterButton,
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
