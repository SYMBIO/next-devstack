import { graphql } from 'relay-runtime';

export const newsCategoryDetailQuery = graphql`
    query newsCategoryDetailQuery($locale: SiteLocale, $filter: NewsCategoryModelFilter) {
        item: newsCategory(locale: $locale, filter: $filter) {
            id
            title
            slug
        }
    }
`;

export const newsCategoryListQuery = graphql`
    query newsCategoryListQuery(
        $locale: SiteLocale
        $limit: IntType
        $offset: IntType
        $filter: NewsCategoryModelFilter
    ) {
        meta: _allNewsCategoriesMeta(locale: $locale, filter: $filter) {
            count
        }
        items: allNewsCategories(
            locale: $locale
            orderBy: [position_ASC]
            first: $limit
            skip: $offset
            filter: $filter
        ) {
            id
            title
            slug
        }
    }
`;
