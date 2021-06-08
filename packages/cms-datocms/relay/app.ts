import { graphql } from 'react-relay';

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
