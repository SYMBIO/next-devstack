/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SiteLocale = "cs" | "en" | "%future added value";
export type webSettingQueryVariables = {
    locale?: SiteLocale | null;
};
export type webSettingQueryResponse = {
    readonly item: {
        readonly logo: {
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
};
export type webSettingQuery = {
    readonly response: webSettingQueryResponse;
    readonly variables: webSettingQueryVariables;
};



/*
query webSettingQuery(
  $locale: SiteLocale
) {
  item: webSetting(locale: $locale) {
    logo {
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
  "name": "url",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v1/*: any*/),
    (v2/*: any*/)
  ],
  "type": "PageRecord",
  "abstractKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "links",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
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
              (v3/*: any*/),
              (v4/*: any*/)
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
v6 = [
  (v2/*: any*/),
  (v1/*: any*/)
],
v7 = [
  {
    "alias": "item",
    "args": [
      {
        "kind": "Variable",
        "name": "locale",
        "variableName": "locale"
      }
    ],
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
          (v1/*: any*/),
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
          (v2/*: any*/),
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
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
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
        "selections": (v6/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageRecord",
        "kind": "LinkedField",
        "name": "newsPage",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "MenuRecord",
        "kind": "LinkedField",
        "name": "footerMenu",
        "plural": false,
        "selections": (v5/*: any*/),
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
    "name": "webSettingQuery",
    "selections": (v7/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "webSettingQuery",
    "selections": (v7/*: any*/)
  },
  "params": {
    "cacheID": "11990f18a63ac1b13c0eeccfb5b0987d",
    "id": null,
    "metadata": {},
    "name": "webSettingQuery",
    "operationKind": "query",
    "text": "query webSettingQuery(\n  $locale: SiteLocale\n) {\n  item: webSetting(locale: $locale) {\n    logo {\n      url\n      width\n      height\n      alt\n      title\n      focalPoint {\n        x\n        y\n      }\n    }\n    mainMenu {\n      links {\n        __typename\n        ... on PageRecord {\n          id\n          url\n          title\n        }\n        ... on MenuRecord {\n          links {\n            __typename\n            ... on PageRecord {\n              id\n              url\n              title\n            }\n            ... on MenuRecord {\n              links {\n                __typename\n                ... on PageRecord {\n                  id\n                  url\n                  title\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    homepage {\n      title\n      url\n    }\n    newsPage {\n      title\n      url\n    }\n    footerMenu {\n      links {\n        __typename\n        ... on PageRecord {\n          id\n          url\n          title\n        }\n        ... on MenuRecord {\n          links {\n            __typename\n            ... on PageRecord {\n              id\n              url\n              title\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '380857da8e65a64602ed62679073ccc1';
export default node;
