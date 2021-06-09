/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SiteLocale = "cs" | "en" | "%future added value";
export type siteQueryVariables = {
    locale?: SiteLocale | null;
};
export type siteQueryResponse = {
    readonly item: {
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
};
export type siteQuery = {
    readonly response: siteQueryResponse;
    readonly variables: siteQueryVariables;
};



/*
query siteQuery(
  $locale: SiteLocale
) {
  item: _site(locale: $locale) {
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
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": "item",
    "args": [
      {
        "kind": "Variable",
        "name": "locale",
        "variableName": "locale"
      }
    ],
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
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
                "concreteType": "FileField",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "twitterCard",
                "storageKey": null
              }
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
        "selections": (v1/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "tag",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "attributes",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "content",
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
    "name": "siteQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "siteQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "72c47035875d8275d5c61ab158a3e91a",
    "id": null,
    "metadata": {},
    "name": "siteQuery",
    "operationKind": "query",
    "text": "query siteQuery(\n  $locale: SiteLocale\n) {\n  item: _site(locale: $locale) {\n    globalSeo {\n      siteName\n      titleSuffix\n      facebookPageUrl\n      fallbackSeo {\n        description\n        title\n        image {\n          url\n        }\n        twitterCard\n      }\n      twitterAccount\n    }\n    favicon {\n      url\n    }\n    faviconMetaTags {\n      tag\n      attributes\n      content\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5dceed82875d758584b8f8b15079302b';
export default node;
