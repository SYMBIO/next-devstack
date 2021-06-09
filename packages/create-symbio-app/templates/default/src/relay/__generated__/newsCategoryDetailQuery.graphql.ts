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
    title?: StringFilter | null;
    slug?: SlugFilter | null;
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
export type SlugFilter = {
    eq?: string | null;
    neq?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
};
export type newsCategoryDetailQueryVariables = {
    locale?: SiteLocale | null;
    filter?: NewsCategoryModelFilter | null;
};
export type newsCategoryDetailQueryResponse = {
    readonly item: {
        readonly id: string;
        readonly title: string | null;
        readonly slug: string | null;
    } | null;
};
export type newsCategoryDetailQuery = {
    readonly response: newsCategoryDetailQueryResponse;
    readonly variables: newsCategoryDetailQueryVariables;
};



/*
query newsCategoryDetailQuery(
  $locale: SiteLocale
  $filter: NewsCategoryModelFilter
) {
  item: newsCategory(locale: $locale, filter: $filter) {
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
  "name": "locale"
},
v2 = [
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
      }
    ],
    "concreteType": "NewsCategoryRecord",
    "kind": "LinkedField",
    "name": "newsCategory",
    "plural": false,
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "newsCategoryDetailQuery",
    "selections": (v2/*: any*/),
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
    "name": "newsCategoryDetailQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "8a93462bb6d8fb726799f74836540518",
    "id": null,
    "metadata": {},
    "name": "newsCategoryDetailQuery",
    "operationKind": "query",
    "text": "query newsCategoryDetailQuery(\n  $locale: SiteLocale\n  $filter: NewsCategoryModelFilter\n) {\n  item: newsCategory(locale: $locale, filter: $filter) {\n    id\n    title\n    slug\n  }\n}\n"
  }
};
})();
(node as any).hash = '442bc6441c804490bc3b93c1af9b1670';
export default node;
