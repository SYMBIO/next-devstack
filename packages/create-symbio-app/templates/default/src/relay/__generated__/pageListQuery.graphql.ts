/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ItemStatus = "draft" | "published" | "updated" | "%future added value";
export type SiteLocale = "cs" | "en" | "%future added value";
export type PageModelFilter = {
    _createdAt?: CreatedAtFilter | null;
    createdAt?: CreatedAtFilter | null;
    id?: ItemIdFilter | null;
    _firstPublishedAt?: PublishedAtFilter | null;
    parent?: ParentFilter | null;
    position?: PositionFilter | null;
    _publicationScheduledAt?: PublishedAtFilter | null;
    _unpublishingScheduledAt?: PublishedAtFilter | null;
    _publishedAt?: PublishedAtFilter | null;
    _status?: StatusFilter | null;
    _updatedAt?: UpdatedAtFilter | null;
    updatedAt?: UpdatedAtFilter | null;
    _isValid?: BooleanFilter | null;
    title?: StringFilter | null;
    metaTags?: SeoFilter | null;
    url?: StringFilter | null;
    displayTitle?: StringFilter | null;
    OR?: Array<PageModelFilter | null> | null;
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
export type ParentFilter = {
    eq?: string | null;
    exists?: boolean | null;
};
export type PositionFilter = {
    gt?: number | null;
    lt?: number | null;
    gte?: number | null;
    lte?: number | null;
    eq?: number | null;
    neq?: number | null;
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
export type StringMatchesFilter = {
    pattern: string;
    caseSensitive?: boolean | null;
    regexp?: boolean | null;
};
export type SeoFilter = {
    exists?: boolean | null;
};
export type pageListQueryVariables = {
    locale?: SiteLocale | null;
    filter?: PageModelFilter | null;
    limit?: number | null;
    offset?: number | null;
};
export type pageListQueryResponse = {
    readonly items: ReadonlyArray<{
        readonly id: string;
        readonly url: string | null;
        readonly _allUrlLocales: ReadonlyArray<{
            readonly locale: SiteLocale | null;
            readonly value: string | null;
        } | null> | null;
        readonly title: string | null;
        readonly _status: ItemStatus;
        readonly _seoMetaTags: ReadonlyArray<{
            readonly tag: string;
            readonly content: string | null;
            readonly attributes: unknown | null;
        }>;
        readonly metaTags: {
            readonly title: string | null;
            readonly image: {
                readonly url: string;
            } | null;
            readonly description: string | null;
            readonly twitterCard: string | null;
        } | null;
        readonly parent: {
            readonly id: string;
            readonly title: string | null;
            readonly url: string | null;
            readonly parent: {
                readonly id: string;
                readonly title: string | null;
                readonly url: string | null;
                readonly parent: {
                    readonly id: string;
                    readonly title: string | null;
                    readonly url: string | null;
                    readonly parent: {
                        readonly id: string;
                        readonly title: string | null;
                        readonly url: string | null;
                    } | null;
                } | null;
            } | null;
        } | null;
        readonly content: ReadonlyArray<({
            readonly __typename: "ButtonBlockRecord";
            readonly id: string;
            readonly file: {
                readonly id: number;
                readonly size: number;
                readonly title: string | null;
                readonly url: string;
            } | null;
            readonly icon: {
                readonly id: string;
            } | null;
            readonly page: {
                readonly id: string;
                readonly url: string | null;
            } | null;
            readonly label: string | null;
        } | {
            readonly __typename: "CarouselBlockRecord";
            readonly id: string;
            readonly textAlign: string | null;
            readonly autoplay: boolean | null;
            readonly interval: number | null;
            readonly banners: ReadonlyArray<{
                readonly id: string;
                readonly image: {
                    readonly id: number;
                    readonly url: string;
                    readonly width: number | null;
                    readonly height: number | null;
                    readonly alt: string | null;
                    readonly title: string | null;
                } | null;
                readonly video: {
                    readonly id: number;
                    readonly width: number | null;
                    readonly height: number | null;
                    readonly video: {
                        readonly streamingUrl: string;
                        readonly thumbnailUrl: string;
                    } | null;
                } | null;
                readonly headline: string | null;
                readonly description: string | null;
                readonly textAlign: string | null;
            }>;
        } | {
            readonly __typename: "CmsFormBlockRecord";
            readonly form: {
                readonly id: string;
                readonly title: string | null;
                readonly submitLabel: string | null;
                readonly successMessage: string | null;
                readonly content: ReadonlyArray<({
                    readonly __typename: "SingleLineInputRecord";
                    readonly id: string;
                    readonly label: string | null;
                    readonly placeholder: string | null;
                    readonly required: boolean | null;
                    readonly hint: string | null;
                    readonly variant: string | null;
                } | {
                    readonly __typename: "TextareaRecord";
                    readonly id: string;
                    readonly label: string | null;
                    readonly required: boolean | null;
                } | {
                    readonly __typename: "FieldsetRecord";
                    readonly id: string;
                    readonly legend: string | null;
                } | {
                    readonly __typename: "CheckboxRecord";
                    readonly id: string;
                    readonly label: string | null;
                    readonly required: boolean | null;
                } | {
                    readonly __typename: "ChoiceRecord";
                    readonly id: string;
                    readonly label: string | null;
                    readonly required: boolean | null;
                    readonly choices: any | null;
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }) | null> | null;
            } | null;
        } | {
            readonly __typename: "Error404BlockRecord";
            readonly id: string;
            readonly description: string | null;
            readonly headline: string | null;
        } | {
            readonly __typename: "GalleryBlockRecord";
            readonly assets: ReadonlyArray<{
                readonly id: number;
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
                readonly id: number;
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
            readonly __typename: "NewsDetailBlockRecord";
            readonly id: string;
        } | {
            readonly __typename: "NewsListFloorBlockRecord";
            readonly id: string;
            readonly allNewsPage: {
                readonly url: string | null;
            } | null;
            readonly allNewsLinkText: string | null;
            readonly categories: ReadonlyArray<{
                readonly id: string;
            }>;
            readonly count: number | null;
            readonly heading: string | null;
        } | {
            readonly __typename: "RichTextBlockRecord";
            readonly id: string;
            readonly text: string | null;
        } | {
            readonly __typename: "SubpageListBlockRecord";
            readonly id: string;
            readonly page: {
                readonly __typename: string;
                readonly id: string;
                readonly url: string | null;
                readonly title: string | null;
            } | null;
            readonly sortAlphabetically: boolean | null;
            readonly heading: string | null;
        } | {
            readonly __typename: "VideoBlockRecord";
            readonly id: string;
            readonly autoplay: boolean | null;
            readonly video: {
                readonly id: number;
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
            } | null;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        }) | null> | null;
    }>;
};
export type pageListQuery = {
    readonly response: pageListQueryResponse;
    readonly variables: pageListQueryVariables;
};



/*
query pageListQuery(
  $locale: SiteLocale
  $filter: PageModelFilter
  $limit: IntType
  $offset: IntType
) {
  items: allPages(locale: $locale, filter: $filter, first: $limit, skip: $offset) {
    id
    url
    _allUrlLocales {
      locale
      value
    }
    title
    _status
    _seoMetaTags {
      tag
      content
      attributes
    }
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
    content {
      __typename
      __isPageModelContentField: __typename
      ... on ButtonBlockRecord {
        id
        file {
          id
          size
          title
          url
        }
        icon {
          id
        }
        page {
          id
          url
        }
        label
      }
      ... on CarouselBlockRecord {
        id
        textAlign
        autoplay
        interval
        banners {
          id
          image {
            id
            url
            width
            height
            alt
            title
          }
          video {
            id
            width
            height
            video {
              streamingUrl
              thumbnailUrl
            }
          }
          headline
          description
          textAlign
        }
      }
      ... on CmsFormBlockRecord {
        form {
          id
          title
          submitLabel
          successMessage
          content {
            __typename
            ... on SingleLineInputRecord {
              id
              label
              placeholder
              required
              hint
              variant
            }
            ... on TextareaRecord {
              id
              label
              required
            }
            ... on FieldsetRecord {
              id
              legend
            }
            ... on CheckboxRecord {
              id
              label
              required
            }
            ... on ChoiceRecord {
              id
              label
              required
              choices
            }
          }
        }
      }
      ... on Error404BlockRecord {
        id
        description
        headline
      }
      ... on GalleryBlockRecord {
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
      ... on NewsDetailBlockRecord {
        id
      }
      ... on NewsListFloorBlockRecord {
        id
        allNewsPage {
          url
        }
        allNewsLinkText
        categories {
          id
        }
        count
        heading
      }
      ... on RichTextBlockRecord {
        id
        text
      }
      ... on SubpageListBlockRecord {
        id
        page {
          __typename
          id
          url
          title
        }
        sortAlphabetically
        heading
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
        }
      }
    }
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
  "name": "limit"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "locale"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "offset"
},
v4 = [
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "filter"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "locale",
    "variableName": "locale"
  },
  {
    "kind": "Variable",
    "name": "skip",
    "variableName": "offset"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "StringMultiLocaleField",
  "kind": "LinkedField",
  "name": "_allUrlLocales",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locale",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_status",
  "storageKey": null
},
v10 = {
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
v11 = [
  (v6/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "SeoField",
  "kind": "LinkedField",
  "name": "metaTags",
  "plural": false,
  "selections": [
    (v8/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": (v11/*: any*/),
      "storageKey": null
    },
    (v12/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "twitterCard",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "PageRecord",
  "kind": "LinkedField",
  "name": "parent",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v8/*: any*/),
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "parent",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        (v8/*: any*/),
        (v6/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PageRecord",
          "kind": "LinkedField",
          "name": "parent",
          "plural": false,
          "selections": [
            (v5/*: any*/),
            (v8/*: any*/),
            (v6/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "PageRecord",
              "kind": "LinkedField",
              "name": "parent",
              "plural": false,
              "selections": [
                (v5/*: any*/),
                (v8/*: any*/),
                (v6/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v16 = [
  (v5/*: any*/)
],
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v18 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "file",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "size",
          "storageKey": null
        },
        (v8/*: any*/),
        (v6/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "IconRecord",
      "kind": "LinkedField",
      "name": "icon",
      "plural": false,
      "selections": (v16/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "page",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        (v6/*: any*/)
      ],
      "storageKey": null
    },
    (v17/*: any*/)
  ],
  "type": "ButtonBlockRecord",
  "abstractKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "textAlign",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "autoplay",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v23 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v21/*: any*/),
  (v22/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "alt",
    "storageKey": null
  },
  (v8/*: any*/)
],
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "FileField",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": (v23/*: any*/),
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "concreteType": "FileField",
  "kind": "LinkedField",
  "name": "video",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v21/*: any*/),
    (v22/*: any*/),
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "thumbnailUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headline",
  "storageKey": null
},
v27 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/),
    (v19/*: any*/),
    (v20/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "interval",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "BannerRecord",
      "kind": "LinkedField",
      "name": "banners",
      "plural": true,
      "selections": [
        (v5/*: any*/),
        (v24/*: any*/),
        (v25/*: any*/),
        (v26/*: any*/),
        (v12/*: any*/),
        (v19/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "CarouselBlockRecord",
  "abstractKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "required",
  "storageKey": null
},
v29 = [
  (v5/*: any*/),
  (v17/*: any*/),
  (v28/*: any*/)
],
v30 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FormRecord",
      "kind": "LinkedField",
      "name": "form",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        (v8/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "submitLabel",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "successMessage",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "content",
          "plural": true,
          "selections": [
            (v15/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": [
                (v5/*: any*/),
                (v17/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "placeholder",
                  "storageKey": null
                },
                (v28/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "hint",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "variant",
                  "storageKey": null
                }
              ],
              "type": "SingleLineInputRecord",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v29/*: any*/),
              "type": "TextareaRecord",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v5/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "legend",
                  "storageKey": null
                }
              ],
              "type": "FieldsetRecord",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v29/*: any*/),
              "type": "CheckboxRecord",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v5/*: any*/),
                (v17/*: any*/),
                (v28/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "choices",
                  "storageKey": null
                }
              ],
              "type": "ChoiceRecord",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CmsFormBlockRecord",
  "abstractKey": null
},
v31 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/),
    (v12/*: any*/),
    (v26/*: any*/)
  ],
  "type": "Error404BlockRecord",
  "abstractKey": null
},
v32 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "assets",
      "plural": true,
      "selections": (v23/*: any*/),
      "storageKey": null
    }
  ],
  "type": "GalleryBlockRecord",
  "abstractKey": null
},
v33 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/),
    (v24/*: any*/)
  ],
  "type": "ImageBlockRecord",
  "abstractKey": null
},
v34 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/),
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
v35 = {
  "kind": "InlineFragment",
  "selections": (v16/*: any*/),
  "type": "NewsDetailBlockRecord",
  "abstractKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "heading",
  "storageKey": null
},
v37 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "allNewsPage",
      "plural": false,
      "selections": (v11/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allNewsLinkText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "NewsCategoryRecord",
      "kind": "LinkedField",
      "name": "categories",
      "plural": true,
      "selections": (v16/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "count",
      "storageKey": null
    },
    (v36/*: any*/)
  ],
  "type": "NewsListFloorBlockRecord",
  "abstractKey": null
},
v38 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/),
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
v39 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "page",
      "plural": false,
      "selections": [
        (v15/*: any*/),
        (v5/*: any*/),
        (v6/*: any*/),
        (v8/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sortAlphabetically",
      "storageKey": null
    },
    (v36/*: any*/)
  ],
  "type": "SubpageListBlockRecord",
  "abstractKey": null
},
v40 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/),
    (v20/*: any*/),
    (v25/*: any*/)
  ],
  "type": "VideoBlockRecord",
  "abstractKey": null
},
v41 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/),
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
        (v21/*: any*/),
        (v22/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "YoutubeVimeoBlockRecord",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "pageListQuery",
    "selections": [
      {
        "alias": "items",
        "args": (v4/*: any*/),
        "concreteType": "PageRecord",
        "kind": "LinkedField",
        "name": "allPages",
        "plural": true,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v15/*: any*/),
              (v18/*: any*/),
              (v27/*: any*/),
              (v30/*: any*/),
              (v31/*: any*/),
              (v32/*: any*/),
              (v33/*: any*/),
              (v34/*: any*/),
              (v35/*: any*/),
              (v37/*: any*/),
              (v38/*: any*/),
              (v39/*: any*/),
              (v40/*: any*/),
              (v41/*: any*/)
            ],
            "storageKey": null
          }
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
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "pageListQuery",
    "selections": [
      {
        "alias": "items",
        "args": (v4/*: any*/),
        "concreteType": "PageRecord",
        "kind": "LinkedField",
        "name": "allPages",
        "plural": true,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v15/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isPageModelContentField"
              },
              (v18/*: any*/),
              (v27/*: any*/),
              (v30/*: any*/),
              (v31/*: any*/),
              (v32/*: any*/),
              (v33/*: any*/),
              (v34/*: any*/),
              (v35/*: any*/),
              (v37/*: any*/),
              (v38/*: any*/),
              (v39/*: any*/),
              (v40/*: any*/),
              (v41/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "543c2a61389cef11a2bcbbdf4a8c36ff",
    "id": null,
    "metadata": {},
    "name": "pageListQuery",
    "operationKind": "query",
    "text": "query pageListQuery(\n  $locale: SiteLocale\n  $filter: PageModelFilter\n  $limit: IntType\n  $offset: IntType\n) {\n  items: allPages(locale: $locale, filter: $filter, first: $limit, skip: $offset) {\n    id\n    url\n    _allUrlLocales {\n      locale\n      value\n    }\n    title\n    _status\n    _seoMetaTags {\n      tag\n      content\n      attributes\n    }\n    metaTags {\n      title\n      image {\n        url\n      }\n      description\n      twitterCard\n    }\n    parent {\n      id\n      title\n      url\n      parent {\n        id\n        title\n        url\n        parent {\n          id\n          title\n          url\n          parent {\n            id\n            title\n            url\n          }\n        }\n      }\n    }\n    content {\n      __typename\n      __isPageModelContentField: __typename\n      ... on ButtonBlockRecord {\n        id\n        file {\n          id\n          size\n          title\n          url\n        }\n        icon {\n          id\n        }\n        page {\n          id\n          url\n        }\n        label\n      }\n      ... on CarouselBlockRecord {\n        id\n        textAlign\n        autoplay\n        interval\n        banners {\n          id\n          image {\n            id\n            url\n            width\n            height\n            alt\n            title\n          }\n          video {\n            id\n            width\n            height\n            video {\n              streamingUrl\n              thumbnailUrl\n            }\n          }\n          headline\n          description\n          textAlign\n        }\n      }\n      ... on CmsFormBlockRecord {\n        form {\n          id\n          title\n          submitLabel\n          successMessage\n          content {\n            __typename\n            ... on SingleLineInputRecord {\n              id\n              label\n              placeholder\n              required\n              hint\n              variant\n            }\n            ... on TextareaRecord {\n              id\n              label\n              required\n            }\n            ... on FieldsetRecord {\n              id\n              legend\n            }\n            ... on CheckboxRecord {\n              id\n              label\n              required\n            }\n            ... on ChoiceRecord {\n              id\n              label\n              required\n              choices\n            }\n          }\n        }\n      }\n      ... on Error404BlockRecord {\n        id\n        description\n        headline\n      }\n      ... on GalleryBlockRecord {\n        assets {\n          id\n          url\n          width\n          height\n          alt\n          title\n        }\n      }\n      ... on ImageBlockRecord {\n        id\n        image {\n          id\n          url\n          width\n          height\n          alt\n          title\n        }\n      }\n      ... on MapBlockRecord {\n        id\n        bubbleText\n        gps {\n          latitude\n          longitude\n        }\n      }\n      ... on NewsDetailBlockRecord {\n        id\n      }\n      ... on NewsListFloorBlockRecord {\n        id\n        allNewsPage {\n          url\n        }\n        allNewsLinkText\n        categories {\n          id\n        }\n        count\n        heading\n      }\n      ... on RichTextBlockRecord {\n        id\n        text\n      }\n      ... on SubpageListBlockRecord {\n        id\n        page {\n          __typename\n          id\n          url\n          title\n        }\n        sortAlphabetically\n        heading\n      }\n      ... on VideoBlockRecord {\n        id\n        autoplay\n        video {\n          id\n          width\n          height\n          video {\n            streamingUrl\n            thumbnailUrl\n          }\n        }\n      }\n      ... on YoutubeVimeoBlockRecord {\n        id\n        video {\n          provider\n          providerUid\n          width\n          height\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6c7e943a0f433c2e96173f76083556a0';
export default node;
