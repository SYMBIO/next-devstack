/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type appImageFragment = {
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
    readonly " $refType": "appImageFragment";
};
export type appImageFragment$data = appImageFragment;
export type appImageFragment$key = {
    readonly " $data"?: appImageFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"appImageFragment">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "appImageFragment",
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
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
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
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
          "storageKey": null
        },
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "base64",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FileField",
  "abstractKey": null
};
})();
(node as any).hash = '4d3450431ee3f4ef107ae906201644ff';
export default node;
