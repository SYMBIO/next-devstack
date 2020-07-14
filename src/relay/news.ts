import { graphql } from 'relay-runtime';

export const newsDetailQuery = graphql`
    query newsDetailQuery($locale: SiteLocale, $filter: NewsModelFilter) {
        item: news(locale: $locale, filter: $filter) {
            id
            dateFrom
            title
            slug
            perex
            image {
                ...appImageFragment @relay(mask: false)
            }
            category {
                id
                slug
                title
            }
            tags {
                id
                title
            }
            content {
                __typename
                ...GalleryBlock_content @relay(mask: false)
                ...ImageBlock_content @relay(mask: false)
                ...MapBlock_content @relay(mask: false)
                ...RichTextBlock_content @relay(mask: false)
                ...VideoBlock_content @relay(mask: false)
                ...YoutubeVimeoBlock_content @relay(mask: false)
            }
        }
    }
`;

export const newsListQuery = graphql`
    query newsListQuery($locale: SiteLocale, $limit: IntType, $offset: IntType, $filter: NewsModelFilter) {
        meta: _allNewsMeta(locale: $locale, filter: $filter) {
            count
        }
        items: allNews(
            locale: $locale
            orderBy: [dateFrom_DESC, id_DESC]
            first: $limit
            skip: $offset
            filter: $filter
        ) {
            id
            dateFrom
            title
            slug
            perex
            image {
                ...appImageFragment @relay(mask: false)
            }
            category {
                id
                slug
                title
            }
            tags {
                id
                title
            }
        }
    }
`;

export const newsNextQuery = graphql`
    query newsNextQuery($locale: SiteLocale, $filter: NewsModelFilter) {
        item: news(locale: $locale, orderBy: [dateFrom_DESC, id_DESC], filter: $filter) {
            id
            slug
            title
            image {
                ...appImageFragment @relay(mask: false)
            }
        }
    }
`;

export const newsPreviousQuery = graphql`
    query newsPreviousQuery($locale: SiteLocale, $filter: NewsModelFilter) {
        item: news(locale: $locale, orderBy: [dateFrom_ASC, id_ASC], filter: $filter) {
            id
            slug
            title
            image {
                ...appImageFragment @relay(mask: false)
            }
        }
    }
`;

export const newsStaticPathsQuery = graphql`
    query newsStaticPathsQuery($locale: SiteLocale) {
        allNews(locale: $locale, orderBy: [dateFrom_DESC, id_DESC], filter: { title: { exists: true } }) {
            id
            slug
            category {
                id
                slug
                title
            }
        }
    }
`;
