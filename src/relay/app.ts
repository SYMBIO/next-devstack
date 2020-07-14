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
            ...appImageBaseFragment @relay(mask: false)
            responsiveImage(imgixParams: { w: 32 }) {
                ...appResponsiveImageFragment @relay(mask: false)
            }
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
            title
            url
        }
        newsPage {
            title
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
            content {
                ...blocksContent @relay(mask: false)
            }
        }
        redirect(filter: { from: { matches: { pattern: $redirectPattern, caseSensitive: false, regexp: true } } }) {
            to
            httpStatus
        }
    }
`;

graphql`
    fragment appImageBaseFragment on FileField {
        id
        url
    }
`;

graphql`
    fragment appResponsiveImageFragment on ResponsiveImage {
        # HTML5 src/srcset/sizes attributes
        srcSet
        webpSrcSet
        sizes
        src

        # size information (post-transformations)
        width
        height
        aspectRatio

        # SEO attributes
        alt
        title

        # blur-up placeholder, JPEG format, base64-encoded
        base64
    }
`;

graphql`
    fragment appImageFragment on FileField {
        ...appImageBaseFragment @relay(mask: false)
        responsiveImage {
            ...appResponsiveImageFragment @relay(mask: false)
        }
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
