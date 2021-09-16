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
export type newsListQueryVariables = {
    locale?: SiteLocale | null;
    limit?: number | null;
    offset?: number | null;
    filter?: NewsModelFilter | null;
};
export type newsListQueryResponse = {
    readonly meta: {
        readonly count: number;
    };
    readonly items: ReadonlyArray<{
        readonly id: string;
        readonly dateFrom: string | null;
        readonly title: string | null;
        readonly slug: string | null;
        readonly perex: string | null;
        readonly image: {
            readonly url: string;
            readonly width: number | null;
            readonly height: number | null;
            readonly alt: string | null;
            readonly title: string | null;
            readonly focalPoint: {
                readonly x: number | null;
                readonly y: number | null;
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
    }>;
};
export type newsListQuery = {
    readonly response: newsListQueryResponse;
    readonly variables: newsListQueryVariables;
};



/*
query newsListQuery(
  $locale: SiteLocale
  $limit: IntType
  $offset: IntType
  $filter: NewsModelFilter
) {
  meta: _allNewsMeta(locale: $locale, filter: $filter) {
    count
  }
  items: allNews(locale: $locale, orderBy: [dateFrom_DESC, id_DESC], first: $limit, skip: $offset, filter: $filter) {
    id
    dateFrom
    title
    slug
    perex
    image {
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
    category {
      id
      slug
      title
    }
    tags {
      id
      title
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
v4 = {
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v5 = {
  "kind": "Variable",
  "name": "locale",
  "variableName": "locale"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = [
  {
    "alias": "meta",
    "args": [
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "concreteType": "CollectionMetadata",
    "kind": "LinkedField",
    "name": "_allNewsMeta",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "count",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": "items",
    "args": [
      (v4/*: any*/),
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "limit"
      },
      (v5/*: any*/),
      {
        "kind": "Literal",
        "name": "orderBy",
        "value": [
          "dateFrom_DESC",
          "id_DESC"
        ]
      },
      {
        "kind": "Variable",
        "name": "skip",
        "variableName": "offset"
      }
    ],
    "concreteType": "NewsRecord",
    "kind": "LinkedField",
    "name": "allNews",
    "plural": true,
    "selections": [
      (v6/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "dateFrom",
        "storageKey": null
      },
      (v7/*: any*/),
      (v8/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "perex",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "FileField",
        "kind": "LinkedField",
        "name": "image",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "width",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "height",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "alt",
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "focalPoint",
            "kind": "LinkedField",
            "name": "focalPoint",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "x",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "y",
                "storageKey": null
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
        "concreteType": "NewsCategoryRecord",
        "kind": "LinkedField",
        "name": "category",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v8/*: any*/),
          (v7/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "CustomTagRecord",
        "kind": "LinkedField",
        "name": "tags",
        "plural": true,
        "selections": [
          (v6/*: any*/),
          (v7/*: any*/)
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
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "newsListQuery",
    "selections": (v9/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "newsListQuery",
    "selections": (v9/*: any*/)
  },
  "params": {
    "cacheID": "cd108cab5c55d400479ada5750396fb0",
    "id": null,
    "metadata": {},
    "name": "newsListQuery",
    "operationKind": "query",
    "text": "query newsListQuery(\n  $locale: SiteLocale\n  $limit: IntType\n  $offset: IntType\n  $filter: NewsModelFilter\n) {\n  meta: _allNewsMeta(locale: $locale, filter: $filter) {\n    count\n  }\n  items: allNews(locale: $locale, orderBy: [dateFrom_DESC, id_DESC], first: $limit, skip: $offset, filter: $filter) {\n    id\n    dateFrom\n    title\n    slug\n    perex\n    image {\n      url\n      width\n      height\n      alt\n      title\n      focalPoint {\n        x\n        y\n      }\n    }\n    category {\n      id\n      slug\n      title\n    }\n    tags {\n      id\n      title\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fa9422b26d19dc95d8b42acf8a6c2e16';
export default node;
