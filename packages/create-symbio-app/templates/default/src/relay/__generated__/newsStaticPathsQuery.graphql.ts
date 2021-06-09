/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SiteLocale = "cs" | "en" | "%future added value";
export type newsStaticPathsQueryVariables = {
    locale?: SiteLocale | null;
};
export type newsStaticPathsQueryResponse = {
    readonly allNews: ReadonlyArray<{
        readonly id: string;
        readonly slug: string | null;
        readonly category: {
            readonly id: string;
            readonly slug: string | null;
            readonly title: string | null;
        } | null;
    }>;
};
export type newsStaticPathsQuery = {
    readonly response: newsStaticPathsQueryResponse;
    readonly variables: newsStaticPathsQueryVariables;
};



/*
query newsStaticPathsQuery(
  $locale: SiteLocale
) {
  allNews(locale: $locale, orderBy: [dateFrom_DESC, id_DESC], filter: {title: {exists: true}}) {
    id
    slug
    category {
      id
      slug
      title
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "locale"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "filter",
        "value": {
          "title": {
            "exists": true
          }
        }
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
          "dateFrom_DESC",
          "id_DESC"
        ]
      }
    ],
    "concreteType": "NewsRecord",
    "kind": "LinkedField",
    "name": "allNews",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "NewsCategoryRecord",
        "kind": "LinkedField",
        "name": "category",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "newsStaticPathsQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newsStaticPathsQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "5f38947aaeaf8d8142194048559f9059",
    "id": null,
    "metadata": {},
    "name": "newsStaticPathsQuery",
    "operationKind": "query",
    "text": "query newsStaticPathsQuery(\n  $locale: SiteLocale\n) {\n  allNews(locale: $locale, orderBy: [dateFrom_DESC, id_DESC], filter: {title: {exists: true}}) {\n    id\n    slug\n    category {\n      id\n      slug\n      title\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3452a59e063c0115f55085055e16b6db';
export default node;
