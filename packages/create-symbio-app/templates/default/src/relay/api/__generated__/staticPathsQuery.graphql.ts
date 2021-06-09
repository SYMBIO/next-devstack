/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SiteLocale = "cs" | "en" | "%future added value";
export type staticPathsQueryVariables = {
    locale: SiteLocale;
    skip: number;
    first: number;
};
export type staticPathsQueryResponse = {
    readonly _allPagesMeta: {
        readonly count: number;
    };
    readonly allPages: ReadonlyArray<{
        readonly id: string;
        readonly url: string | null;
        readonly content: ReadonlyArray<{
            readonly __typename: string;
        } | null> | null;
    }>;
};
export type staticPathsQuery = {
    readonly response: staticPathsQueryResponse;
    readonly variables: staticPathsQueryVariables;
};



/*
query staticPathsQuery(
  $locale: SiteLocale!
  $skip: IntType!
  $first: IntType!
) {
  _allPagesMeta(locale: $locale) {
    count
  }
  allPages(locale: $locale, skip: $skip, first: $first) {
    id
    url
    content {
      __typename
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "locale"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "skip"
},
v3 = {
  "kind": "Variable",
  "name": "locale",
  "variableName": "locale"
},
v4 = [
  {
    "alias": null,
    "args": [
      (v3/*: any*/)
    ],
    "concreteType": "CollectionMetadata",
    "kind": "LinkedField",
    "name": "_allPagesMeta",
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "first"
      },
      (v3/*: any*/),
      {
        "kind": "Variable",
        "name": "skip",
        "variableName": "skip"
      }
    ],
    "concreteType": "PageRecord",
    "kind": "LinkedField",
    "name": "allPages",
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
        "name": "url",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "staticPathsQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "staticPathsQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "4cc2cc7fac9e4c1ea08415e7ab8347be",
    "id": null,
    "metadata": {},
    "name": "staticPathsQuery",
    "operationKind": "query",
    "text": "query staticPathsQuery(\n  $locale: SiteLocale!\n  $skip: IntType!\n  $first: IntType!\n) {\n  _allPagesMeta(locale: $locale) {\n    count\n  }\n  allPages(locale: $locale, skip: $skip, first: $first) {\n    id\n    url\n    content {\n      __typename\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b40ba0a9d26f8eca97f279220c2efd81';
export default node;
