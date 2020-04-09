import { graphql } from 'react-relay';

export const AppQuery = graphql`
    query SlugAppQuery($locale: SiteLocale, $pattern: String!, $redirectFilter: RedirectModelFilter) {
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
        page(locale: $locale, filter: { url: { matches: { caseSensitive: false, pattern: $pattern } } }) {
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
            content {
                __typename
            }
        }
        redirect(filter: $redirectFilter) {
            to
            httpStatus
        }
    }
`;

export const ContentQuery = graphql`
    query SlugContentQuery($locale: SiteLocale, $pattern: String!) {
        contentPage: page(locale: $locale, filter: { url: { matches: { caseSensitive: false, pattern: $pattern } } }) {
            content {
                __typename
                ... on RichTextRecord {
                    ...RichTextBlock_content
                }
            }
        }
    }
`;
