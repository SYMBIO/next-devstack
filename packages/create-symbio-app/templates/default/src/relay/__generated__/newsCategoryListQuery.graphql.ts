/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ItemStatus = "draft" | "published" | "updated" | "%future added value";
export type SiteLocale = "cs" | "en" | "%future added value";
export type NewsCategoryModelFilter = {
    _createdAt?: CreatedAtFilter | null;
    createdAt?: CreatedAtFilter | null;
    id?: ItemIdFilter | null;
    _firstPublishedAt?: PublishedAtFilter | null;
    position?: PositionFilter | null;
    _publicationScheduledAt?: PublishedAtFilter | null;
    _unpublishingScheduledAt?: PublishedAtFilter | null;
    _publishedAt?: PublishedAtFilter | null;
    _status?: StatusFilter | null;
    _updatedAt?: UpdatedAtFilter | null;
    updatedAt?: UpdatedAtFilter | null;
    _isValid?: BooleanFilter | null;
    slug?: SlugFilter | null;
    title?: StringFilter | null;
    OR?: Array<NewsCategoryModelFilter | null> | null;
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
export type SlugFilter = {
    eq?: string | null;
    neq?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
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
export type newsCategoryListQueryVariables = {
    locale?: SiteLocale | null;
    limit?: number | null;
    offset?: number | null;
    filter?: NewsCategoryModelFilter | null;
};
export type newsCategoryListQueryResponse = {
    readonly meta: {
        readonly count: number;
    };
    readonly items: ReadonlyArray<{
        readonly id: string;
        readonly title: string | null;
        readonly slug: string | null;
    }>;
};
export type newsCategoryListQuery = {
    readonly response: newsCategoryListQueryResponse;
    readonly variables: newsCategoryListQueryVariables;
};



/*
query newsCategoryListQuery(
  $locale: SiteLocale
  $limit: IntType
  $offset: IntType
  $filter: NewsCategoryModelFilter
) {
  meta: _allNewsCategoriesMeta(locale: $locale, filter: $filter) {
    count
  }
  items: allNewsCategories(locale: $locale, orderBy: [position_ASC], first: $limit, skip: $offset, filter: $filter) {
    id
    title
    slug
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
v6 = [
  {
    "alias": "meta",
    "args": [
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "concreteType": "CollectionMetadata",
    "kind": "LinkedField",
    "name": "_allNewsCategoriesMeta",
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
          "position_ASC"
        ]
      },
      {
        "kind": "Variable",
        "name": "skip",
        "variableName": "offset"
      }
    ],
    "concreteType": "NewsCategoryRecord",
    "kind": "LinkedField",
    "name": "allNewsCategories",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
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
    "name": "newsCategoryListQuery",
    "selections": (v6/*: any*/),
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
    "name": "newsCategoryListQuery",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "35c1aacf0032c78afab2e71529032c48",
    "id": null,
    "metadata": {},
    "name": "newsCategoryListQuery",
    "operationKind": "query",
    "text": "query newsCategoryListQuery(\n  $locale: SiteLocale\n  $limit: IntType\n  $offset: IntType\n  $filter: NewsCategoryModelFilter\n) {\n  meta: _allNewsCategoriesMeta(locale: $locale, filter: $filter) {\n    count\n  }\n  items: allNewsCategories(locale: $locale, orderBy: [position_ASC], first: $limit, skip: $offset, filter: $filter) {\n    id\n    title\n    slug\n  }\n}\n"
  }
};
})();
(node as any).hash = '270a64959f9b0d60371e6fde72d2465b';
export default node;
