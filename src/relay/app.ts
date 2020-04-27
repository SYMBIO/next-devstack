import { graphql } from 'react-relay';

graphql`
    fragment appSiteFragment on Site {
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
                twitterCard
            }
            twitterAccount
        }
        favicon {
            url
        }
        faviconMetaTags {
            tag
            attributes
        }
    }
`;

graphql`
    fragment appWebSettingFragment on WebSettingRecord {
        logo {
            ...appImageFragment @relay(mask: false)
        }
        mainMenu {
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
        }
        homepage {
            url
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
        formErrors {
            required
            emailInvalid
            generalError
        }
    }
`;

graphql`
    fragment appPageFragment on PageRecord {
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
`;

export const AppQuery = graphql`
    query appQuery($locale: SiteLocale, $pattern: String!, $redirectPattern: String!) {
        site: _site(locale: $locale) {
            ...appSiteFragment @relay(mask: false)
        }
        webSetting(locale: $locale) {
            ...appWebSettingFragment @relay(mask: false)
        }
        page(locale: $locale, filter: { url: { matches: { caseSensitive: false, pattern: $pattern } } }) {
            ...appPageFragment @relay(mask: false)
        }
        redirect(filter: { from: { matches: { pattern: $redirectPattern, caseSensitive: false, regexp: true } } }) {
            to
            httpStatus
        }
    }
`;

export const ContentQuery = graphql`
    query appContentQuery($locale: SiteLocale, $pattern: String!) {
        contentPage: page(locale: $locale, filter: { url: { matches: { caseSensitive: false, pattern: $pattern } } }) {
            content {
                ...blocksContent @relay(mask: false)
            }
        }
    }
`;

graphql`
    fragment appImageFragment on FileField {
        id
        url
        alt
        width
        height
    }
`;

graphql`
    fragment appVideoFragment on FileField {
        id
        width
        height
        video {
            streamingUrl
            thumbnailUrl
        }
    }
`;
