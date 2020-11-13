import React, { AnchorHTMLAttributes, DetailedHTMLProps, useContext } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { UrlObject } from 'url';
import { getLinkParamsFromPage } from '../../../lib/routing/getLinkParamsFromPage';
import { Page } from '../../../types/app';
import { AppContext } from '../../../contexts/app-context/AppContext';
import condCls from '../../../utils/conditionalClasses';
import styles from './Link.module.scss';

export type LinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> &
    Partial<NextLinkProps> & {
        href?: string | UrlObject;
        page?: Page;
        params?: Record<string, string | number> | ParsedUrlQuery;
        plain?: boolean;
    };

const Link = ({ className, href, page, params, children, target, plain, ...rest }: LinkProps): JSX.Element => {
    const { absoluteLinks, hostname } = useContext(AppContext);

    if (typeof href === 'string') {
        if (absoluteLinks && href.substr(0, 1) === '/') {
            href = '//' + hostname + href;
        }

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
            <NextLink href={href}>
                <a className={condCls(styles.wrapper, className)} target={target} {...rest}>
                    {children}
                </a>
            </NextLink>
        );
    }

    if (page) {
        let href = getLinkParamsFromPage(page, params).as;

        if (absoluteLinks && href.substr(0, 1) === '/') {
            href = '//' + hostname + href;
        }

        if (plain) {
            return (
                <a href={href} className={className} title={page.title || undefined} target={target} {...rest}>
                    {children || page.title}
                </a>
            );
        }
        return (
            <NextLink href={'/[[...slug]]'} as={href}>
                <a
                    className={condCls(styles.wrapper, className)}
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
