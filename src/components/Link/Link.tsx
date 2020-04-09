import React, { AnchorHTMLAttributes, DetailedHTMLProps, useContext } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { getLinkParamsFromPage } from '../../lib/routing/getLinkParamsFromPage';
import { PageRecord, SiteLocale } from '../../types/graphql';
import { AppContext } from '../../utils/app-context/AppContext';
import styles from './Link.module.scss';

interface Props extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    page?: PageRecord;
    params?: Record<string, string | number> | ParsedUrlQuery;
    locale?: SiteLocale;
    plain?: boolean;
}

export const Link = ({
    className,
    href,
    page,
    params,
    locale,
    children,
    target,
    plain,
    ...rest
}: Props): JSX.Element => {
    const { absoluteLinks, currentUri, locale: ctxLocale } = useContext(AppContext);
    const host = currentUri?.substr(0, currentUri.substr(8).indexOf('/') + 8);

    if (typeof href === 'string') {
        if (absoluteLinks && href.substr(0, 1) === '/') {
            href = host + href;
        }

        if (!children) {
            throw new Error('Link with href without children!');
        }

        if (plain) {
            return (
                <a href={href} className={className} target={target} rel="noopener noreferrer">
                    {children}
                </a>
            );
        }

        return (
            <a className={styles.wrapper} href={href} target={target}>
                <div className={styles.inner}>{children}</div>
            </a>
        );
    }

    if (page) {
        const targetLocale = locale || ctxLocale;
        let href = getLinkParamsFromPage(page, targetLocale, params).as;

        if (absoluteLinks && href.substr(0, 1) === '/') {
            href = host + href;
        }

        if (plain) {
            return (
                <a href={href} className={className}>
                    {children || page.title}
                </a>
            );
        }
        return (
            <a className={styles.wrapper} href={href} target={target} {...rest}>
                <div className={styles.inner}>{children || page.title}</div>
            </a>
        );
    }

    throw new Error('Link without href or page');
};
