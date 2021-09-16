/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GalleryBlock_content = {
    readonly id: string;
    readonly assets: ReadonlyArray<{
        readonly url: string;
        readonly width: number | null;
        readonly height: number | null;
        readonly alt: string | null;
        readonly title: string | null;
        readonly focalPoint: {
            readonly x: number | null;
            readonly y: number | null;
        } | null;
    }>;
    readonly " $refType": "GalleryBlock_content";
};
export type GalleryBlock_content$data = GalleryBlock_content;
export type GalleryBlock_content$key = {
    readonly " $data"?: GalleryBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"GalleryBlock_content">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GalleryBlock_content",
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
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "assets",
      "plural": true,
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
      "storageKey": null
    }
  ],
  "type": "GalleryBlockRecord",
  "abstractKey": null
};
(node as any).hash = '71995e0ae23ed58e25a7c1db548af557';
export default node;
