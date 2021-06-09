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
    title?: StringFilter | null;
    category?: LinkFilter | null;
    image?: FileFilter | null;
    dateFrom?: DateTimeFilter | null;
    perex?: TextFilter | null;
    slug?: SlugFilter | null;
    tags?: LinksFilter | null;
    metaTags?: SeoFilter | null;
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
export type LinkFilter = {
    eq?: string | null;
    neq?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
    exists?: boolean | null;
};
export type FileFilter = {
    eq?: number | null;
    neq?: number | null;
    in?: Array<number | null> | null;
    notIn?: Array<number | null> | null;
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
export type SeoFilter = {
    exists?: boolean | null;
};
export type newsPreviousQueryVariables = {
    locale?: SiteLocale | null;
    filter?: NewsModelFilter | null;
};
export type newsPreviousQueryResponse = {
    readonly item: {
        readonly id: string;
        readonly slug: string | null;
        readonly title: string | null;
        readonly image: {
            readonly id: number;
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
    } | null;
};
export type newsPreviousQuery = {
    readonly response: newsPreviousQueryResponse;
    readonly variables: newsPreviousQueryVariables;
};



/*
query newsPreviousQuery(
  $locale: SiteLocale
  $filter: NewsModelFilter
) {
  item: news(locale: $locale, orderBy: [dateFrom_ASC, id_ASC], filter: $filter) {
    id
    slug
    title
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alt",
  "storageKey": null
},
v7 = [
  {
    "alias": "item",
    "args": [
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filter"
      },
      {
        "kind": "Variable",
        "name": "locale",
        "variableName": "locale"
      },
      {
        "kind": "Literal",
        "name": "orderBy",
        "value": [
          "dateFrom_ASC",
          "id_ASC"
        ]
      }
    ],
    "concreteType": "NewsRecord",
    "kind": "LinkedField",
    "name": "news",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
        "storageKey": null
      },
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "FileField",
        "kind": "LinkedField",
        "name": "image",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          },
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v3/*: any*/),
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
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "aspectRatio",
                "storageKey": null
              },
              (v6/*: any*/),
              (v3/*: any*/),
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "newsPreviousQuery",
    "selections": (v7/*: any*/),
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
    "name": "newsPreviousQuery",
    "selections": (v7/*: any*/)
  },
  "params": {
    "cacheID": "a506f59845d1ffcdda360a06d99eabc2",
    "id": null,
    "metadata": {},
    "name": "newsPreviousQuery",
    "operationKind": "query",
    "text": "query newsPreviousQuery(\n  $locale: SiteLocale\n  $filter: NewsModelFilter\n) {\n  item: news(locale: $locale, orderBy: [dateFrom_ASC, id_ASC], filter: $filter) {\n    id\n    slug\n    title\n    image {\n      id\n      url\n      width\n      height\n      alt\n      title\n      responsiveImage {\n        srcSet\n        webpSrcSet\n        sizes\n        src\n        width\n        height\n        aspectRatio\n        alt\n        title\n        base64\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f08bbddfe76593d7e828393710768024';
export default node;
