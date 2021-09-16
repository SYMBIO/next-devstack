/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type webSettingFragment = {
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
    readonly " $refType": "webSettingFragment";
};
export type webSettingFragment$data = webSettingFragment;
export type webSettingFragment$key = {
    readonly " $data"?: webSettingFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"webSettingFragment">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
    (v1/*: any*/)
  ],
  "type": "PageRecord",
  "abstractKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "links",
    "plural": true,
    "selections": [
      (v2/*: any*/),
      (v3/*: any*/),
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
              (v2/*: any*/),
              (v3/*: any*/)
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
v5 = [
  (v1/*: any*/),
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "webSettingFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "logo",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
        (v1/*: any*/),
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
            (v2/*: any*/),
            (v3/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": (v4/*: any*/),
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
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "newsPage",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MenuRecord",
      "kind": "LinkedField",
      "name": "footerMenu",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    }
  ],
  "type": "WebSettingRecord",
  "abstractKey": null
};
})();
(node as any).hash = '84fc6f0cbcabea726b88ec6a8b334e40';
export default node;
