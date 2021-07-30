import { graphql } from 'relay-runtime';

graphql`
    fragment pageFragment on PageRecord {
        id
        url
        _allUrlLocales {
            locale
            value
        }
        title
        _status
        _seoMetaTags {
            tag
            content
            attributes
        }
        metaTags {
            title
            image {
                url
            }
            description
            twitterCard
        }
        parent {
            id
            title
            url
            parent {
                id
                title
                url
                parent {
                    id
                    title
                    url
                    parent {
                        id
                        title
                        url
                    }
                }
            }
        }
        content {
            ...blocksContent @relay(mask: false)
        }
    }
`;

export const pageListQuery = graphql`
    query pageListQuery($locale: SiteLocale, $filter: PageModelFilter, $limit: IntType, $offset: IntType) {
        meta: _allPagesMeta(locale: $locale, filter: $filter) {
            count
        }
        items: allPages(locale: $locale, filter: $filter, first: $limit, skip: $offset) {
            ...pageFragment @relay(mask: false)
        }
    }
`;

export const pageDetailQuery = graphql`
    query pageDetailQuery($locale: SiteLocale, $filter: PageModelFilter) {
        item: page(locale: $locale, filter: $filter) {
            ...pageFragment @relay(mask: false)
        }
    }
`;

export const pageStaticPathsQuery = graphql`
    query pageStaticPathsQuery($locale: SiteLocale!, $skip: IntType!, $first: IntType!) {
        _allPagesMeta(locale: $locale, filter: { url: { exists: true } }) {
            count
        }
        allPages(locale: $locale, skip: $skip, first: $first, filter: { url: { exists: true } }) {
            id
            url
            content {
                __typename
            }
        }
    }
`;
