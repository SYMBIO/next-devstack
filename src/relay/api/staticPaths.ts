import { graphql } from 'relay-runtime';

export const staticPathsQuery = graphql`
    query staticPathsQuery($locale: SiteLocale!, $skip: IntType!, $first: IntType!) {
        _allPagesMeta(locale: $locale) {
            count
        }
        allPages(locale: $locale, skip: $skip, first: $first) {
            id
            url
            content {
                __typename
            }
        }
    }
`;
