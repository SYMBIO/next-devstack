import { graphql } from 'react-relay';

graphql`
    fragment pageFragment on PageRecord {
        id
        url
        _allUrlLocales {
            locale
            value
        }
        title
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
        _allPagesMeta(locale: $locale) {
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
