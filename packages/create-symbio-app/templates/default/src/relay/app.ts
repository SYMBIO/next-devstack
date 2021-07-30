import { graphql } from 'relay-runtime';

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
    fragment appImageBaseFragment on FileField {
        id
        url
        width
        height
        alt
        title
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
