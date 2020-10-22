import { graphql } from 'react-relay';

graphql`
    fragment webSettingFragment on WebSettingRecord {
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
                    id
                    title
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

export const webSettingQuery = graphql`
    query webSettingQuery($locale: SiteLocale) {
        item: webSetting(locale: $locale) {
            ...webSettingFragment @relay(mask: false)
        }
    }
`;
