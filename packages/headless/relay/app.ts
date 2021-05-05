import { graphql } from 'react-relay';

export const AppQuery = graphql`
    query appQuery($locale: SiteLocale, $pattern: String!, $redirectPattern: String!) {
        site: _site(locale: $locale) {
            ...siteFragment @relay(mask: false)
        }
        webSetting(locale: $locale) {
            ...webSettingFragment @relay(mask: false)
        }
        page(locale: $locale, filter: { url: { matches: { caseSensitive: false, pattern: $pattern } } }) {
            ...pageFragment @relay(mask: false)
        }
        redirect(filter: { from: { matches: { pattern: $redirectPattern, caseSensitive: false, regexp: true } } }) {
            ...redirectFragment @relay(mask: false)
        }
    }
`;

graphql`
    fragment appImageFragment on FileField {
        url
        width
        height
        alt
        title
        focalPoint {
            x
            y
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

graphql`
    fragment appFileFragment on FileField {
        id
        title
        url
        filename
        format
        size
    }
`;

graphql`
    fragment appRouteFragment on RouteRecord {
        id
        label
        title
        object {
            __typename
            ... on PageRecord {
                id
                title
                url
            }
            ... on NewsRecord {
                id
                title
                slug
            }
        }
        file {
            url
        }
        url
        isTargetBlank
        parameters
    }
`;
