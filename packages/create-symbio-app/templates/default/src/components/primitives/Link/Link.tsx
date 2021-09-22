import React, { AnchorHTMLAttributes, memo } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { UrlObject } from 'url';
import { nbsp } from '@symbio/headless/utils';
import { getHrefFromRoute } from '@symbio/headless/dist/lib/routing/getHrefFromRoute';
import { getLinkParamsFromPage } from '@symbio/headless/dist/lib/routing/getLinkParamsFromPage';
import { Route } from '@symbio/cms';
import { PageProps } from '../../../types/page';
import { appRouteFragment } from '../../../relay/__generated__/appRouteFragment.graphql';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
    Partial<NextLinkProps> & {
        href?: string | UrlObject;
        page?: Pick<PageProps, 'id' | 'url' | 'title'>;
        route?: Route<appRouteFragment['object']>;
        params?: Record<string, string | number> | ParsedUrlQuery;
        plain?: boolean;
    };

const _Link = ({
    className,
    href,
    page,
    route,
    locale,
    params,
    children,
    target,
    plain,
    ...rest
}: LinkProps): JSX.Element => {
    let realHref = '';

    if (typeof href === 'string') {
        if (!children) {
            throw new Error('Link with href without children!');
        }
        realHref = href;
    } else if (page) {
        realHref = getLinkParamsFromPage(page, params).as;
    } else if (route) {
        realHref = getHrefFromRoute(route);
    }

    const attrs = {
        className,
        target: route && route.isTargetBlank ? '_blank' : target,
        title: route?.label || route?.title || page?.title || undefined,
        ...rest,
    };

    const realChildren = children || route?.label || route?.title || page?.title;

    if (plain || (realHref && realHref.startsWith('http')) || target === '_blank') {
        return (
            <a href={realHref} {...attrs}>
                {typeof realChildren === 'string' ? nbsp(realChildren) : realChildren}
            </a>
        );
    }

    return (
        <NextLink href={'/[[...slug]]'} as={realHref} locale={locale} passHref>
            <a
                {...attrs}
                {...rest}
                onClick={(e) => {
                    if (typeof attrs.onClick === 'function') {
                        return attrs.onClick(e);
                    }
                    return true;
                }}
            >
                {typeof realChildren === 'string' ? nbsp(realChildren) : realChildren}
            </a>
        </NextLink>
    );
};

_Link.whyDidYouRender = true;

export const Link = memo(_Link);
