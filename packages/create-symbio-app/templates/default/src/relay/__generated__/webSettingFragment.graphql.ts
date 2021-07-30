/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type webSettingFragment = {
    readonly logo: {
        readonly id: string;
        readonly url: string;
        readonly width: number | null;
        readonly height: number | null;
        readonly alt: string | null;
        readonly title: string | null;
        readonly responsiveImage: {
            readonly srcSet: string;
            readonly webpSrcSet: string;
            readonly sizes: string;
            readonly src: string;
            readonly width: number;
            readonly height: number;
            readonly aspectRatio: number;
            readonly alt: string | null;
            readonly title: string | null;
            readonly base64: string | null;
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
  "name": "id",
  "storageKey": null
},
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
  "name": "width",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "kind": "InlineFragment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v5/*: any*/)
  ],
  "type": "PageRecord",
  "abstractKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "links",
    "plural": true,
    "selections": [
      (v6/*: any*/),
      (v7/*: any*/),
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
              (v6/*: any*/),
              (v7/*: any*/)
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
v9 = [
  (v5/*: any*/),
  (v1/*: any*/)
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
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/),
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "imgixParams",
              "value": {
                "w": 32
              }
            }
          ],
          "concreteType": "ResponsiveImage",
          "kind": "LinkedField",
          "name": "responsiveImage",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "webpSrcSet",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "sizes",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "src",
              "storageKey": null
            },
            (v2/*: any*/),
            (v3/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "aspectRatio",
              "storageKey": null
            },
            (v4/*: any*/),
            (v5/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "base64",
              "storageKey": null
            }
          ],
          "storageKey": "responsiveImage(imgixParams:{\"w\":32})"
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
            (v6/*: any*/),
            (v7/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": (v8/*: any*/),
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
      "selections": (v9/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "newsPage",
      "plural": false,
      "selections": (v9/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MenuRecord",
      "kind": "LinkedField",
      "name": "footerMenu",
      "plural": false,
      "selections": (v8/*: any*/),
      "storageKey": null
    }
  ],
  "type": "WebSettingRecord",
  "abstractKey": null
};
})();
(node as any).hash = '022dee438843afa34babc1e0593d24b4';
export default node;
