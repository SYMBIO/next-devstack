/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SiteLocale = "cs" | "en" | "%future added value";
export type pageStaticPathsQueryVariables = {
    locale: SiteLocale;
    skip: number;
    first: number;
};
export type pageStaticPathsQueryResponse = {
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
export type pageStaticPathsQuery = {
    readonly response: pageStaticPathsQueryResponse;
    readonly variables: pageStaticPathsQueryVariables;
};



/*
query pageStaticPathsQuery(
  $locale: SiteLocale!
  $skip: IntType!
  $first: IntType!
) {
  _allPagesMeta(locale: $locale, filter: {url: {exists: true}}) {
    count
  }
  allPages(locale: $locale, skip: $skip, first: $first, filter: {url: {exists: true}}) {
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
  "kind": "Literal",
  "name": "filter",
  "value": {
    "url": {
      "exists": true
    }
  }
},
v4 = {
  "kind": "Variable",
  "name": "locale",
  "variableName": "locale"
},
v5 = [
  {
    "alias": null,
    "args": [
      (v3/*: any*/),
      (v4/*: any*/)
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
      (v3/*: any*/),
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "first"
      },
      (v4/*: any*/),
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
    "name": "pageStaticPathsQuery",
    "selections": (v5/*: any*/),
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
    "name": "pageStaticPathsQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "888a5c8f1cc547942e1f5ae12393cf7a",
    "id": null,
    "metadata": {},
    "name": "pageStaticPathsQuery",
    "operationKind": "query",
    "text": "query pageStaticPathsQuery(\n  $locale: SiteLocale!\n  $skip: IntType!\n  $first: IntType!\n) {\n  _allPagesMeta(locale: $locale, filter: {url: {exists: true}}) {\n    count\n  }\n  allPages(locale: $locale, skip: $skip, first: $first, filter: {url: {exists: true}}) {\n    id\n    url\n    content {\n      __typename\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b69510e93a8d72c3af06d012255e1c2d';
export default node;
