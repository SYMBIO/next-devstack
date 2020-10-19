import { graphql } from 'react-relay';

graphql`
    fragment siteFragment on Site {
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

export const siteQuery = graphql`
    query siteQuery($locale: SiteLocale) {
        _site(locale: $locale) {
            ...siteFragment @relay(mask: false)
        }
    }
`;
