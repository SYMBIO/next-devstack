/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type appImageFragment = {
    readonly url: string;
    readonly width: number | null;
    readonly height: number | null;
    readonly alt: string | null;
    readonly title: string | null;
    readonly focalPoint: {
        readonly x: number | null;
        readonly y: number | null;
    } | null;
    readonly " $refType": "appImageFragment";
};
export type appImageFragment$data = appImageFragment;
export type appImageFragment$key = {
    readonly " $data"?: appImageFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"appImageFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "appImageFragment",
  "selections": [
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
  "type": "FileField",
  "abstractKey": null
};
(node as any).hash = '862eccdcbbc3304ade262ab7420a5afd';
export default node;
