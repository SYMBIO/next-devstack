/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ItemStatus = "draft" | "published" | "updated" | "%future added value";
export type SiteLocale = "cs" | "en" | "%future added value";
export type appQueryVariables = {
    locale?: SiteLocale | null;
    pattern: string;
    redirectPattern: string;
};
export type appQueryResponse = {
    readonly site: {
        readonly globalSeo: {
            readonly siteName: string | null;
            readonly titleSuffix: string | null;
            readonly facebookPageUrl: string | null;
            readonly fallbackSeo: {
                readonly description: string | null;
                readonly title: string | null;
                readonly image: {
                    readonly url: string;
                } | null;
                readonly twitterCard: string | null;
            } | null;
            readonly twitterAccount: string | null;
        } | null;
        readonly favicon: {
            readonly url: string;
        } | null;
        readonly faviconMetaTags: ReadonlyArray<{
            readonly tag: string;
            readonly attributes: unknown | null;
            readonly content: string | null;
        }>;
    };
    readonly webSetting: {
        readonly logo: {
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
        readonly mainMenu: {
            readonly links: ReadonlyArray<{
                readonly __typename: "PageRecord";
                readonly id: string;
                readonly url: string | null;
                readonly title: string | null;
            } | {
                readonly __typename: "MenuRecord";
                readonly links: ReadonlyArray<{
                    readonly __typename: "PageRecord";
                    readonly id: string;
                    readonly url: string | null;
                    readonly title: string | null;
                } | {
                    readonly __typename: "MenuRecord";
                    readonly links: ReadonlyArray<{
                        readonly __typename: "PageRecord";
                        readonly id: string;
                        readonly url: string | null;
                        readonly title: string | null;
                    } | {
                        /*This will never be '%other', but we need some
                        value in case none of the concrete values match.*/
                        readonly __typename: "%other";
                    }>;
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }>;
            } | {
                /*This will never be '%other', but we need some
                value in case none of the concrete values match.*/
                readonly __typename: "%other";
            }>;
        } | null;
        readonly homepage: {
            readonly title: string | null;
            readonly url: string | null;
        } | null;
        readonly newsPage: {
            readonly title: string | null;
            readonly url: string | null;
        } | null;
        readonly footerMenu: {
            readonly links: ReadonlyArray<{
                readonly __typename: "PageRecord";
                readonly id: string;
                readonly url: string | null;
                readonly title: string | null;
            } | {
                readonly __typename: "MenuRecord";
                readonly links: ReadonlyArray<{
                    readonly __typename: "PageRecord";
                    readonly id: string;
                    readonly url: string | null;
                    readonly title: string | null;
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }>;
            } | {
                /*This will never be '%other', but we need some
                value in case none of the concrete values match.*/
                readonly __typename: "%other";
            }>;
        } | null;
    } | null;
    readonly page: {
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
                readonly id: string;
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
                    readonly id: string;
                    readonly url: string;
                    readonly width: number | null;
                    readonly height: number | null;
                    readonly alt: string | null;
                    readonly title: string | null;
                } | null;
                readonly video: {
                    readonly id: string;
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
            readonly id: string;
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
                    readonly choices: unknown | null;
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
            readonly __typename: "NewsDetailBlockRecord";
            readonly id: string;
        } | {
            readonly __typename: "NewsListFloorBlockRecord";
            readonly id: string;
            readonly allNewsPage: {
                readonly id: string;
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
    } | null;
    readonly redirect: {
        readonly id: string;
        readonly from: string | null;
        readonly to: string | null;
        readonly permanent: boolean | null;
    } | null;
};
export type appQuery = {
    readonly response: appQueryResponse;
    readonly variables: appQueryVariables;
};



/*
query appQuery(
  $locale: SiteLocale
  $pattern: String!
  $redirectPattern: String!
) {
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
      content
    }
  }
  webSetting(locale: $locale) {
    logo {
      id
      url
      width
      height
      alt
      title
      responsiveImage(imgixParams: {w: 32}) {
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
  page(locale: $locale, filter: {url: {matches: {caseSensitive: false, pattern: $pattern}}}) {
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
        id
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
      ... on NewsDetailBlockRecord {
        id
      }
      ... on NewsListFloorBlockRecord {
        id
        allNewsPage {
          id
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
          title
          thumbnailUrl
        }
      }
    }
  }
  redirect(filter: {from: {matches: {pattern: $redirectPattern, caseSensitive: false, regexp: true}}}) {
    id
    from
    to
    permanent
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "locale"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "pattern"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "redirectPattern"
  }
],
v1 = {
  "kind": "Variable",
  "name": "locale",
  "variableName": "locale"
},
v2 = [
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = [
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "FileField",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "twitterCard",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tag",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "attributes",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v12 = {
  "alias": "site",
  "args": (v2/*: any*/),
  "concreteType": "Site",
  "kind": "LinkedField",
  "name": "_site",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GlobalSeoField",
      "kind": "LinkedField",
      "name": "globalSeo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "siteName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "titleSuffix",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "facebookPageUrl",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SeoField",
          "kind": "LinkedField",
          "name": "fallbackSeo",
          "plural": false,
          "selections": [
            (v3/*: any*/),
            (v4/*: any*/),
            (v7/*: any*/),
            (v8/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "twitterAccount",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "favicon",
      "plural": false,
      "selections": (v6/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Tag",
      "kind": "LinkedField",
      "name": "faviconMetaTags",
      "plural": true,
      "selections": [
        (v9/*: any*/),
        (v10/*: any*/),
        (v11/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alt",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v18 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
    (v5/*: any*/),
    (v4/*: any*/)
  ],
  "type": "PageRecord",
  "abstractKey": null
},
v19 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "links",
    "plural": true,
    "selections": [
      (v17/*: any*/),
      (v18/*: any*/),
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "links",
            "plural": true,
            "selections": [
              (v17/*: any*/),
              (v18/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "type": "MenuRecord",
        "abstractKey": null
      }
    ],
    "storageKey": null
  }
],
v20 = [
  (v4/*: any*/),
  (v5/*: any*/)
],
v21 = {
  "alias": null,
  "args": (v2/*: any*/),
  "concreteType": "WebSettingRecord",
  "kind": "LinkedField",
  "name": "webSetting",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "logo",
      "plural": false,
      "selections": [
        (v13/*: any*/),
        (v5/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/),
        (v16/*: any*/),
        (v4/*: any*/),
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "imgixParams",
              "value": {
                "w": 32
              }
            }
          ],
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
            (v14/*: any*/),
            (v15/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "aspectRatio",
              "storageKey": null
            },
            (v16/*: any*/),
            (v4/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "base64",
              "storageKey": null
            }
          ],
          "storageKey": "responsiveImage(imgixParams:{\"w\":32})"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MenuRecord",
      "kind": "LinkedField",
      "name": "mainMenu",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "links",
          "plural": true,
          "selections": [
            (v17/*: any*/),
            (v18/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": (v19/*: any*/),
              "type": "MenuRecord",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "homepage",
      "plural": false,
      "selections": (v20/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "newsPage",
      "plural": false,
      "selections": (v20/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MenuRecord",
      "kind": "LinkedField",
      "name": "footerMenu",
      "plural": false,
      "selections": (v19/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v22 = {
  "kind": "Literal",
  "name": "caseSensitive",
  "value": false
},
v23 = [
  {
    "fields": [
      {
        "fields": [
          {
            "fields": [
              (v22/*: any*/),
              {
                "kind": "Variable",
                "name": "pattern",
                "variableName": "pattern"
              }
            ],
            "kind": "ObjectValue",
            "name": "matches"
          }
        ],
        "kind": "ObjectValue",
        "name": "url"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  },
  (v1/*: any*/)
],
v24 = {
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
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_status",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "concreteType": "Tag",
  "kind": "LinkedField",
  "name": "_seoMetaTags",
  "plural": true,
  "selections": [
    (v9/*: any*/),
    (v11/*: any*/),
    (v10/*: any*/)
  ],
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "SeoField",
  "kind": "LinkedField",
  "name": "metaTags",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v7/*: any*/),
    (v3/*: any*/),
    (v8/*: any*/)
  ],
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "concreteType": "PageRecord",
  "kind": "LinkedField",
  "name": "parent",
  "plural": false,
  "selections": [
    (v13/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "parent",
      "plural": false,
      "selections": [
        (v13/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PageRecord",
          "kind": "LinkedField",
          "name": "parent",
          "plural": false,
          "selections": [
            (v13/*: any*/),
            (v4/*: any*/),
            (v5/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "PageRecord",
              "kind": "LinkedField",
              "name": "parent",
              "plural": false,
              "selections": [
                (v13/*: any*/),
                (v4/*: any*/),
                (v5/*: any*/)
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
v29 = [
  (v13/*: any*/)
],
v30 = [
  (v13/*: any*/),
  (v5/*: any*/)
],
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v32 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "file",
      "plural": false,
      "selections": [
        (v13/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "size",
          "storageKey": null
        },
        (v4/*: any*/),
        (v5/*: any*/)
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
      "selections": (v29/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "page",
      "plural": false,
      "selections": (v30/*: any*/),
      "storageKey": null
    },
    (v31/*: any*/)
  ],
  "type": "ButtonBlockRecord",
  "abstractKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "textAlign",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "autoplay",
  "storageKey": null
},
v35 = [
  (v13/*: any*/),
  (v5/*: any*/),
  (v14/*: any*/),
  (v15/*: any*/),
  (v16/*: any*/),
  (v4/*: any*/)
],
v36 = {
  "alias": null,
  "args": null,
  "concreteType": "FileField",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": (v35/*: any*/),
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "thumbnailUrl",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "concreteType": "FileField",
  "kind": "LinkedField",
  "name": "video",
  "plural": false,
  "selections": [
    (v13/*: any*/),
    (v14/*: any*/),
    (v15/*: any*/),
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
        (v37/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headline",
  "storageKey": null
},
v40 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
    (v33/*: any*/),
    (v34/*: any*/),
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
        (v13/*: any*/),
        (v36/*: any*/),
        (v38/*: any*/),
        (v39/*: any*/),
        (v3/*: any*/),
        (v33/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "CarouselBlockRecord",
  "abstractKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "required",
  "storageKey": null
},
v42 = [
  (v13/*: any*/),
  (v31/*: any*/),
  (v41/*: any*/)
],
v43 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "FormRecord",
      "kind": "LinkedField",
      "name": "form",
      "plural": false,
      "selections": [
        (v13/*: any*/),
        (v4/*: any*/),
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
            (v17/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": [
                (v13/*: any*/),
                (v31/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "placeholder",
                  "storageKey": null
                },
                (v41/*: any*/),
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
              "selections": (v42/*: any*/),
              "type": "TextareaRecord",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v13/*: any*/),
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
              "selections": (v42/*: any*/),
              "type": "CheckboxRecord",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v13/*: any*/),
                (v31/*: any*/),
                (v41/*: any*/),
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
v44 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
    (v3/*: any*/),
    (v39/*: any*/)
  ],
  "type": "Error404BlockRecord",
  "abstractKey": null
},
v45 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "assets",
      "plural": true,
      "selections": (v35/*: any*/),
      "storageKey": null
    }
  ],
  "type": "GalleryBlockRecord",
  "abstractKey": null
},
v46 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
    (v36/*: any*/)
  ],
  "type": "ImageBlockRecord",
  "abstractKey": null
},
v47 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
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
v48 = {
  "kind": "InlineFragment",
  "selections": (v29/*: any*/),
  "type": "NewsDetailBlockRecord",
  "abstractKey": null
},
v49 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "heading",
  "storageKey": null
},
v50 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "allNewsPage",
      "plural": false,
      "selections": (v30/*: any*/),
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
      "selections": (v29/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "count",
      "storageKey": null
    },
    (v49/*: any*/)
  ],
  "type": "NewsListFloorBlockRecord",
  "abstractKey": null
},
v51 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
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
v52 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "page",
      "plural": false,
      "selections": [
        (v17/*: any*/),
        (v13/*: any*/),
        (v5/*: any*/),
        (v4/*: any*/)
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
    (v49/*: any*/)
  ],
  "type": "SubpageListBlockRecord",
  "abstractKey": null
},
v53 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
    (v34/*: any*/),
    (v38/*: any*/)
  ],
  "type": "VideoBlockRecord",
  "abstractKey": null
},
v54 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/),
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
        (v14/*: any*/),
        (v15/*: any*/),
        (v4/*: any*/),
        (v37/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "YoutubeVimeoBlockRecord",
  "abstractKey": null
},
v55 = {
  "alias": null,
  "args": [
    {
      "fields": [
        {
          "fields": [
            {
              "fields": [
                (v22/*: any*/),
                {
                  "kind": "Variable",
                  "name": "pattern",
                  "variableName": "redirectPattern"
                },
                {
                  "kind": "Literal",
                  "name": "regexp",
                  "value": true
                }
              ],
              "kind": "ObjectValue",
              "name": "matches"
            }
          ],
          "kind": "ObjectValue",
          "name": "from"
        }
      ],
      "kind": "ObjectValue",
      "name": "filter"
    }
  ],
  "concreteType": "RedirectRecord",
  "kind": "LinkedField",
  "name": "redirect",
  "plural": false,
  "selections": [
    (v13/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "from",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "to",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "permanent",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "appQuery",
    "selections": [
      (v12/*: any*/),
      (v21/*: any*/),
      {
        "alias": null,
        "args": (v23/*: any*/),
        "concreteType": "PageRecord",
        "kind": "LinkedField",
        "name": "page",
        "plural": false,
        "selections": [
          (v13/*: any*/),
          (v5/*: any*/),
          (v24/*: any*/),
          (v4/*: any*/),
          (v25/*: any*/),
          (v26/*: any*/),
          (v27/*: any*/),
          (v28/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v17/*: any*/),
              (v32/*: any*/),
              (v40/*: any*/),
              (v43/*: any*/),
              (v44/*: any*/),
              (v45/*: any*/),
              (v46/*: any*/),
              (v47/*: any*/),
              (v48/*: any*/),
              (v50/*: any*/),
              (v51/*: any*/),
              (v52/*: any*/),
              (v53/*: any*/),
              (v54/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v55/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "appQuery",
    "selections": [
      (v12/*: any*/),
      (v21/*: any*/),
      {
        "alias": null,
        "args": (v23/*: any*/),
        "concreteType": "PageRecord",
        "kind": "LinkedField",
        "name": "page",
        "plural": false,
        "selections": [
          (v13/*: any*/),
          (v5/*: any*/),
          (v24/*: any*/),
          (v4/*: any*/),
          (v25/*: any*/),
          (v26/*: any*/),
          (v27/*: any*/),
          (v28/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v17/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isPageModelContentField"
              },
              (v32/*: any*/),
              (v40/*: any*/),
              (v43/*: any*/),
              (v44/*: any*/),
              (v45/*: any*/),
              (v46/*: any*/),
              (v47/*: any*/),
              (v48/*: any*/),
              (v50/*: any*/),
              (v51/*: any*/),
              (v52/*: any*/),
              (v53/*: any*/),
              (v54/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v55/*: any*/)
    ]
  },
  "params": {
    "cacheID": "2b588679a8a2bc5736189a113fd95168",
    "id": null,
    "metadata": {},
    "name": "appQuery",
    "operationKind": "query",
    "text": "query appQuery(\n  $locale: SiteLocale\n  $pattern: String!\n  $redirectPattern: String!\n) {\n  site: _site(locale: $locale) {\n    globalSeo {\n      siteName\n      titleSuffix\n      facebookPageUrl\n      fallbackSeo {\n        description\n        title\n        image {\n          url\n        }\n        twitterCard\n      }\n      twitterAccount\n    }\n    favicon {\n      url\n    }\n    faviconMetaTags {\n      tag\n      attributes\n      content\n    }\n  }\n  webSetting(locale: $locale) {\n    logo {\n      id\n      url\n      width\n      height\n      alt\n      title\n      responsiveImage(imgixParams: {w: 32}) {\n        srcSet\n        webpSrcSet\n        sizes\n        src\n        width\n        height\n        aspectRatio\n        alt\n        title\n        base64\n      }\n    }\n    mainMenu {\n      links {\n        __typename\n        ... on PageRecord {\n          id\n          url\n          title\n        }\n        ... on MenuRecord {\n          links {\n            __typename\n            ... on PageRecord {\n              id\n              url\n              title\n            }\n            ... on MenuRecord {\n              links {\n                __typename\n                ... on PageRecord {\n                  id\n                  url\n                  title\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    homepage {\n      title\n      url\n    }\n    newsPage {\n      title\n      url\n    }\n    footerMenu {\n      links {\n        __typename\n        ... on PageRecord {\n          id\n          url\n          title\n        }\n        ... on MenuRecord {\n          links {\n            __typename\n            ... on PageRecord {\n              id\n              url\n              title\n            }\n          }\n        }\n      }\n    }\n  }\n  page(locale: $locale, filter: {url: {matches: {caseSensitive: false, pattern: $pattern}}}) {\n    id\n    url\n    _allUrlLocales {\n      locale\n      value\n    }\n    title\n    _status\n    _seoMetaTags {\n      tag\n      content\n      attributes\n    }\n    metaTags {\n      title\n      image {\n        url\n      }\n      description\n      twitterCard\n    }\n    parent {\n      id\n      title\n      url\n      parent {\n        id\n        title\n        url\n        parent {\n          id\n          title\n          url\n          parent {\n            id\n            title\n            url\n          }\n        }\n      }\n    }\n    content {\n      __typename\n      __isPageModelContentField: __typename\n      ... on ButtonBlockRecord {\n        id\n        file {\n          id\n          size\n          title\n          url\n        }\n        icon {\n          id\n        }\n        page {\n          id\n          url\n        }\n        label\n      }\n      ... on CarouselBlockRecord {\n        id\n        textAlign\n        autoplay\n        interval\n        banners {\n          id\n          image {\n            id\n            url\n            width\n            height\n            alt\n            title\n          }\n          video {\n            id\n            width\n            height\n            video {\n              streamingUrl\n              thumbnailUrl\n            }\n          }\n          headline\n          description\n          textAlign\n        }\n      }\n      ... on CmsFormBlockRecord {\n        id\n        form {\n          id\n          title\n          submitLabel\n          successMessage\n          content {\n            __typename\n            ... on SingleLineInputRecord {\n              id\n              label\n              placeholder\n              required\n              hint\n              variant\n            }\n            ... on TextareaRecord {\n              id\n              label\n              required\n            }\n            ... on FieldsetRecord {\n              id\n              legend\n            }\n            ... on CheckboxRecord {\n              id\n              label\n              required\n            }\n            ... on ChoiceRecord {\n              id\n              label\n              required\n              choices\n            }\n          }\n        }\n      }\n      ... on Error404BlockRecord {\n        id\n        description\n        headline\n      }\n      ... on GalleryBlockRecord {\n        id\n        assets {\n          id\n          url\n          width\n          height\n          alt\n          title\n        }\n      }\n      ... on ImageBlockRecord {\n        id\n        image {\n          id\n          url\n          width\n          height\n          alt\n          title\n        }\n      }\n      ... on MapBlockRecord {\n        id\n        bubbleText\n        gps {\n          latitude\n          longitude\n        }\n      }\n      ... on NewsDetailBlockRecord {\n        id\n      }\n      ... on NewsListFloorBlockRecord {\n        id\n        allNewsPage {\n          id\n          url\n        }\n        allNewsLinkText\n        categories {\n          id\n        }\n        count\n        heading\n      }\n      ... on RichTextBlockRecord {\n        id\n        text\n      }\n      ... on SubpageListBlockRecord {\n        id\n        page {\n          __typename\n          id\n          url\n          title\n        }\n        sortAlphabetically\n        heading\n      }\n      ... on VideoBlockRecord {\n        id\n        autoplay\n        video {\n          id\n          width\n          height\n          video {\n            streamingUrl\n            thumbnailUrl\n          }\n        }\n      }\n      ... on YoutubeVimeoBlockRecord {\n        id\n        video {\n          provider\n          providerUid\n          width\n          height\n          title\n          thumbnailUrl\n        }\n      }\n    }\n  }\n  redirect(filter: {from: {matches: {pattern: $redirectPattern, caseSensitive: false, regexp: true}}}) {\n    id\n    from\n    to\n    permanent\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b8686150943b59879d943067e625c44b';
export default node;
