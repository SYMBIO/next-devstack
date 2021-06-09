/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ItemStatus = "draft" | "published" | "updated" | "%future added value";
export type RedirectModelFilter = {
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
    permanent?: BooleanFilter | null;
    to?: StringFilter | null;
    from?: StringFilter | null;
    OR?: Array<RedirectModelFilter | null> | null;
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
export type redirectListQueryVariables = {
    filter?: RedirectModelFilter | null;
    limit?: number | null;
    offset?: number | null;
};
export type redirectListQueryResponse = {
    readonly items: ReadonlyArray<{
        readonly id: string;
        readonly from: string | null;
        readonly to: string | null;
        readonly permanent: boolean | null;
    }>;
};
export type redirectListQuery = {
    readonly response: redirectListQueryResponse;
    readonly variables: redirectListQueryVariables;
};



/*
query redirectListQuery(
  $filter: RedirectModelFilter
  $limit: IntType
  $offset: IntType
) {
  items: allRedirects(filter: $filter, first: $limit, skip: $offset) {
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
    "name": "filter"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "limit"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offset"
  }
],
v1 = [
  {
    "alias": "items",
    "args": [
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
        "name": "skip",
        "variableName": "offset"
      }
    ],
    "concreteType": "RedirectRecord",
    "kind": "LinkedField",
    "name": "allRedirects",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "redirectListQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "redirectListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "04e79a0635df6343c26cf35bdd6bbc00",
    "id": null,
    "metadata": {},
    "name": "redirectListQuery",
    "operationKind": "query",
    "text": "query redirectListQuery(\n  $filter: RedirectModelFilter\n  $limit: IntType\n  $offset: IntType\n) {\n  items: allRedirects(filter: $filter, first: $limit, skip: $offset) {\n    id\n    from\n    to\n    permanent\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e4f3ce6ccfaeea7d1fcaf52a1eeaf207';
export default node;