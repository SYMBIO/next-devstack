import { graphql } from 'react-relay';

export const pageListQuery = graphql`
    query pageListQuery($locale: SiteLocale, $filter: PageModelFilter, $limit: IntType, $offset: IntType) {
        allPages(locale: $locale, filter: $filter, first: $limit, skip: $offset) {
            id
            url
            title
            metaTags {
                title
                image {
                    url
                }
                description
                twitterCard
            }
        }
    }
`;

export const pageDetailQuery = graphql`
    query pageDetailQuery($locale: SiteLocale, $filter: PageModelFilter) {
        item: page(locale: $locale, filter: $filter) {
            id
            url
            title
            parent {
                id
            }
            metaTags {
                title
                image {
                    url
                }
                description
                twitterCard
            }
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
