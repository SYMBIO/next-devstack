/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ItemStatus = "draft" | "published" | "updated" | "%future added value";
export type SiteLocale = "cs" | "en" | "%future added value";
export type NewsModelFilter = {
    _createdAt?: CreatedAtFilter | null;
    createdAt?: CreatedAtFilter | null;
    id?: ItemIdFilter | null;
    _firstPublishedAt?: PublishedAtFilter | null;
    _publicationScheduledAt?: PublishedAtFilter | null;
    _unpublishingScheduledAt?: PublishedAtFilter | null;
    _publishedAt?: PublishedAtFilter | null;
    _status?: StatusFilter | null;
    _updatedAt?: UpdatedAtFilter | null;
    updatedAt?: UpdatedAtFilter | null;
    _isValid?: BooleanFilter | null;
    image?: FileFilter | null;
    metaTags?: SeoFilter | null;
    slug?: SlugFilter | null;
    tags?: LinksFilter | null;
    dateFrom?: DateTimeFilter | null;
    perex?: TextFilter | null;
    category?: LinkFilter | null;
    title?: StringFilter | null;
    OR?: Array<NewsModelFilter | null> | null;
};
export type CreatedAtFilter = {
    gt?: string | null;
    lt?: string | null;
    gte?: string | null;
    lte?: string | null;
    exists?: boolean | null;
    eq?: string | null;
    neq?: string | null;
};
export type ItemIdFilter = {
    eq?: string | null;
    neq?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
};
export type PublishedAtFilter = {
    gt?: string | null;
    lt?: string | null;
    gte?: string | null;
    lte?: string | null;
    exists?: boolean | null;
    eq?: string | null;
    neq?: string | null;
};
export type StatusFilter = {
    eq?: ItemStatus | null;
    neq?: ItemStatus | null;
    in?: Array<ItemStatus | null> | null;
    notIn?: Array<ItemStatus | null> | null;
};
export type UpdatedAtFilter = {
    gt?: string | null;
    lt?: string | null;
    gte?: string | null;
    lte?: string | null;
    exists?: boolean | null;
    eq?: string | null;
    neq?: string | null;
};
export type BooleanFilter = {
    eq?: boolean | null;
};
export type FileFilter = {
    eq?: string | null;
    neq?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
    exists?: boolean | null;
};
export type SeoFilter = {
    exists?: boolean | null;
};
export type SlugFilter = {
    eq?: string | null;
    neq?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
};
export type LinksFilter = {
    eq?: Array<string | null> | null;
    allIn?: Array<string | null> | null;
    anyIn?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
    exists?: boolean | null;
};
export type DateTimeFilter = {
    gt?: string | null;
    lt?: string | null;
    gte?: string | null;
    lte?: string | null;
    exists?: boolean | null;
    eq?: string | null;
    neq?: string | null;
};
export type TextFilter = {
    matches?: StringMatchesFilter | null;
    notMatches?: StringMatchesFilter | null;
    isBlank?: boolean | null;
    exists?: boolean | null;
};
export type StringMatchesFilter = {
    pattern: string;
    caseSensitive?: boolean | null;
    regexp?: boolean | null;
};
export type LinkFilter = {
    eq?: string | null;
    neq?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
    exists?: boolean | null;
};
export type StringFilter = {
    matches?: StringMatchesFilter | null;
    notMatches?: StringMatchesFilter | null;
    isBlank?: boolean | null;
    eq?: string | null;
    neq?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
    exists?: boolean | null;
};
export type newsDetailQueryVariables = {
    locale?: SiteLocale | null;
    filter?: NewsModelFilter | null;
};
export type newsDetailQueryResponse = {
    readonly item: {
        readonly id: string;
        readonly dateFrom: string | null;
        readonly title: string | null;
        readonly slug: string | null;
        readonly _seoMetaTags: ReadonlyArray<{
            readonly tag: string;
            readonly content: string | null;
            readonly attributes: unknown | null;
        }>;
        readonly perex: string | null;
        readonly image: {
            readonly id: string;
            readonly url: string;
            readonly width: number | null;
            readonly height: number | null;
            readonly alt: string | null;
            readonly title: string | null;
            readonly responsiveImage: {
                readonly srcSet: string;
                readonly webpSrcSet: string;
                readonly sizes: string;
                readonly src: string;
                readonly width: number;
                readonly height: number;
                readonly aspectRatio: number;
                readonly alt: string | null;
                readonly title: string | null;
                readonly base64: string | null;
            } | null;
        } | null;
        readonly category: {
            readonly id: string;
            readonly slug: string | null;
            readonly title: string | null;
        } | null;
        readonly tags: ReadonlyArray<{
            readonly id: string;
            readonly title: string | null;
        }>;
        readonly content: ReadonlyArray<({
            readonly __typename: "GalleryBlockRecord";
            readonly id: string;
            readonly assets: ReadonlyArray<{
                readonly id: string;
                readonly url: string;
                readonly width: number | null;
                readonly height: number | null;
                readonly alt: string | null;
                readonly title: string | null;
            }>;
        } | {
            readonly __typename: "ImageBlockRecord";
            readonly id: string;
            readonly image: {
                readonly id: string;
                readonly url: string;
                readonly width: number | null;
                readonly height: number | null;
                readonly alt: string | null;
                readonly title: string | null;
            } | null;
        } | {
            readonly __typename: "MapBlockRecord";
            readonly id: string;
            readonly bubbleText: string | null;
            readonly gps: {
                readonly latitude: number | null;
                readonly longitude: number | null;
            } | null;
        } | {
            readonly __typename: "RichTextBlockRecord";
            readonly id: string;
            readonly text: string | null;
        } | {
            readonly __typename: "VideoBlockRecord";
            readonly id: string;
            readonly autoplay: boolean | null;
            readonly video: {
                readonly id: string;
                readonly width: number | null;
                readonly height: number | null;
                readonly video: {
                    readonly streamingUrl: string;
                    readonly thumbnailUrl: string;
                } | null;
            } | null;
        } | {
            readonly __typename: "YoutubeVimeoBlockRecord";
            readonly id: string;
            readonly video: {
                readonly provider: string | null;
                readonly providerUid: string | null;
                readonly width: number | null;
                readonly height: number | null;
                readonly title: string | null;
                readonly thumbnailUrl: string | null;
            } | null;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        }) | null> | null;
        readonly __typename: string;
        readonly _status: ItemStatus;
    } | null;
};
export type newsDetailQuery = {
    readonly response: newsDetailQueryResponse;
    readonly variables: newsDetailQueryVariables;
};



/*
query newsDetailQuery(
  $locale: SiteLocale
  $filter: NewsModelFilter
) {
  item: news(locale: $locale, filter: $filter) {
    id
    dateFrom
    title
    slug
    _seoMetaTags {
      tag
      content
      attributes
    }
    perex
    image {
      id
      url
      width
      height
      alt
      title
      responsiveImage {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
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
      __isNewsModelContentField: __typename
      ... on GalleryBlockRecord {
        id
        assets {
          id
          url
          width
          height
          alt
          title
        }
      }
      ... on ImageBlockRecord {
        id
        image {
          id
          url
          width
          height
          alt
          title
        }
      }
      ... on MapBlockRecord {
        id
        bubbleText
        gps {
          latitude
          longitude
        }
      }
      ... on RichTextBlockRecord {
        id
        text
      }
      ... on VideoBlockRecord {
        id
        autoplay
        video {
          id
          width
          height
          video {
            streamingUrl
            thumbnailUrl
          }
        }
      }
      ... on YoutubeVimeoBlockRecord {
        id
        video {
          provider
          providerUid
          width
          height
          title
          thumbnailUrl
        }
      }
    }
    __typename
    _status
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "locale"
},
v2 = [
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "filter"
  },
  {
    "kind": "Variable",
    "name": "locale",
    "variableName": "locale"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateFrom",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Tag",
  "kind": "LinkedField",
  "name": "_seoMetaTags",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "tag",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "attributes",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "perex",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alt",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "FileField",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v9/*: any*/),
    (v10/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ResponsiveImage",
      "kind": "LinkedField",
      "name": "responsiveImage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "srcSet",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "webpSrcSet",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "sizes",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "src",
          "storageKey": null
        },
        (v10/*: any*/),
        (v11/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
          "storageKey": null
        },
        (v12/*: any*/),
        (v5/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "base64",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "NewsCategoryRecord",
  "kind": "LinkedField",
  "name": "category",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v6/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "CustomTagRecord",
  "kind": "LinkedField",
  "name": "tags",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v17 = [
  (v3/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/),
  (v5/*: any*/)
],
v18 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "assets",
      "plural": true,
      "selections": (v17/*: any*/),
      "storageKey": null
    }
  ],
  "type": "GalleryBlockRecord",
  "abstractKey": null
},
v19 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": (v17/*: any*/),
      "storageKey": null
    }
  ],
  "type": "ImageBlockRecord",
  "abstractKey": null
},
v20 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bubbleText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LatLonField",
      "kind": "LinkedField",
      "name": "gps",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "latitude",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "longitude",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MapBlockRecord",
  "abstractKey": null
},
v21 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    }
  ],
  "type": "RichTextBlockRecord",
  "abstractKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "thumbnailUrl",
  "storageKey": null
},
v23 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "autoplay",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "video",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        (v10/*: any*/),
        (v11/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "UploadVideoField",
          "kind": "LinkedField",
          "name": "video",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "streamingUrl",
              "storageKey": null
            },
            (v22/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "VideoBlockRecord",
  "abstractKey": null
},
v24 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "VideoField",
      "kind": "LinkedField",
      "name": "video",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "provider",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "providerUid",
          "storageKey": null
        },
        (v10/*: any*/),
        (v11/*: any*/),
        (v5/*: any*/),
        (v22/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "YoutubeVimeoBlockRecord",
  "abstractKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "newsDetailQuery",
    "selections": [
      {
        "alias": "item",
        "args": (v2/*: any*/),
        "concreteType": "NewsRecord",
        "kind": "LinkedField",
        "name": "news",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v16/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/)
            ],
            "storageKey": null
          },
          (v16/*: any*/),
          (v25/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "newsDetailQuery",
    "selections": [
      {
        "alias": "item",
        "args": (v2/*: any*/),
        "concreteType": "NewsRecord",
        "kind": "LinkedField",
        "name": "news",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v16/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isNewsModelContentField"
              },
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/)
            ],
            "storageKey": null
          },
          (v16/*: any*/),
          (v25/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "989e3790e90213a35a99507b87d66a2c",
    "id": null,
    "metadata": {},
    "name": "newsDetailQuery",
    "operationKind": "query",
    "text": "query newsDetailQuery(\n  $locale: SiteLocale\n  $filter: NewsModelFilter\n) {\n  item: news(locale: $locale, filter: $filter) {\n    id\n    dateFrom\n    title\n    slug\n    _seoMetaTags {\n      tag\n      content\n      attributes\n    }\n    perex\n    image {\n      id\n      url\n      width\n      height\n      alt\n      title\n      responsiveImage {\n        srcSet\n        webpSrcSet\n        sizes\n        src\n        width\n        height\n        aspectRatio\n        alt\n        title\n        base64\n      }\n    }\n    category {\n      id\n      slug\n      title\n    }\n    tags {\n      id\n      title\n    }\n    content {\n      __typename\n      __isNewsModelContentField: __typename\n      ... on GalleryBlockRecord {\n        id\n        assets {\n          id\n          url\n          width\n          height\n          alt\n          title\n        }\n      }\n      ... on ImageBlockRecord {\n        id\n        image {\n          id\n          url\n          width\n          height\n          alt\n          title\n        }\n      }\n      ... on MapBlockRecord {\n        id\n        bubbleText\n        gps {\n          latitude\n          longitude\n        }\n      }\n      ... on RichTextBlockRecord {\n        id\n        text\n      }\n      ... on VideoBlockRecord {\n        id\n        autoplay\n        video {\n          id\n          width\n          height\n          video {\n            streamingUrl\n            thumbnailUrl\n          }\n        }\n      }\n      ... on YoutubeVimeoBlockRecord {\n        id\n        video {\n          provider\n          providerUid\n          width\n          height\n          title\n          thumbnailUrl\n        }\n      }\n    }\n    __typename\n    _status\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a69d09f5d137369a0f2d57974e8e914a';
export default node;
