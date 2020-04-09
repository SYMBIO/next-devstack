import { graphql } from 'react-relay';

export const AppQuery = graphql`
    query appQuery($locale: SiteLocale, $filter: PageModelFilter, $redirectFilter: RedirectModelFilter) {
        site: _site(locale: $locale) {
            globalSeo {
                siteName
                titleSuffix
                facebookPageUrl
                fallbackSeo {
                    description
                    title
                    image {
                        url
                    }
                }
            }
            favicon {
                url
            }
        }
        webSetting(locale: $locale) {
            mainMenu {
                links {
                    __typename
                    ... on PageRecord {
                        id
                        url
                        title
                    }
                }
            }
            newsPage {
                url
            }
            footerMenu {
                links {
                    __typename
                    ... on PageRecord {
                        id
                        url
                        title
                    }
                    ... on MenuRecord {
                        links {
                            __typename
                            ... on PageRecord {
                                id
                                url
                                title
                            }
                        }
                    }
                }
            }
        }
        page(locale: $locale, filter: $filter) {
            id
            url
            title
        }
        redirect(filter: $redirectFilter) {
            to
            httpStatus
        }
    }
`;

export const ContentQuery = graphql`
    query appContentQuery($locale: SiteLocale, $filter: PageModelFilter) {
        contentPage: page(locale: $locale, filter: $filter) {
            content {
                __typename
                ...RichTextBlock_content
            }
        }
    }
`;
