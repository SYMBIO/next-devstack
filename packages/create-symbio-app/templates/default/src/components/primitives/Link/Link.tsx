import React, { AnchorHTMLAttributes, DetailedHTMLProps, useContext } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { UrlObject } from 'url';
import clsx from 'clsx';
import { getLinkParamsFromPage } from '@symbio/headless/lib/routing/getLinkParamsFromPage';
import { BasePage } from '@symbio/headless';
import styles from './Link.module.scss';

export type LinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> &
    Partial<NextLinkProps> & {
        href?: string | UrlObject;
        page?: BasePage;
        params?: Record<string, string | number> | ParsedUrlQuery;
        plain?: boolean;
    };

const Link = ({ className, href, page, locale, params, children, target, plain, ...rest }: LinkProps): JSX.Element => {
    if (typeof href === 'string') {
        // if (absoluteLinks && href.substr(0, 1) === '/') {
        //     href = '//' + hostname + href;
        // }

        if (!children) {
            throw new Error('Link with href without children!');
        }

        if (plain) {
            return (
                <a href={href} className={className} target={target} {...rest}>
                    {children}
                </a>
            );
        }

        return (
            <NextLink href={href} locale={locale}>
                <a className={clsx(styles.wrapper, className)} target={target} {...rest}>
                    {children}
                </a>
            </NextLink>
        );
    }

    if (page) {
        let href = getLinkParamsFromPage(page, params).as;

        // if (absoluteLinks && href.substr(0, 1) === '/') {
        //     href = '//' + hostname + href;
        // }

        if (plain) {
            return (
                <a href={href} className={className} title={page.title || undefined} target={target} {...rest}>
                    {children || page.title}
                </a>
            );
        }
        return (
            <NextLink href={'/[[...slug]]'} as={href} locale={locale}>
                <a
                    className={clsx(styles.wrapper, className)}
                    title={page.title || undefined}
                    target={target}
                    {...rest}
                >
                    {children || page.title}
                </a>
            </NextLink>
        );
    }

    throw new Error('Link without href or page');
};

Link.whyDidYouRender = true;

export { Link };
