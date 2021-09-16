/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ImageBlock_content = {
    readonly id: string;
    readonly image: {
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
    readonly " $refType": "ImageBlock_content";
};
export type ImageBlock_content$data = ImageBlock_content;
export type ImageBlock_content$key = {
    readonly " $data"?: ImageBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"ImageBlock_content">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ImageBlock_content",
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
      "name": "image",
      "plural": false,
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
  "type": "ImageBlockRecord",
  "abstractKey": null
};
(node as any).hash = 'e2257d5d4edb16ab2f680ac8ee04cb05';
export default node;
