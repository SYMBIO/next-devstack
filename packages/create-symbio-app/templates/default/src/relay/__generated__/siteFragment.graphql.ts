/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type siteFragment = {
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
    readonly " $refType": "siteFragment";
};
export type siteFragment$data = siteFragment;
export type siteFragment$key = {
    readonly " $data"?: siteFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"siteFragment">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "siteFragment",
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
              "selections": (v0/*: any*/),
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
      "selections": (v0/*: any*/),
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
  "type": "Site",
  "abstractKey": null
};
})();
(node as any).hash = '41e85474977308b4a527679cbe4533cf';
export default node;
