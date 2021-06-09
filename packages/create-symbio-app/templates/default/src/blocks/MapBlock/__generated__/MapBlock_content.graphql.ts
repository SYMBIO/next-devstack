/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MapBlock_content = {
    readonly id: string;
    readonly bubbleText: string | null;
    readonly gps: {
        readonly latitude: number | null;
        readonly longitude: number | null;
    } | null;
    readonly " $refType": "MapBlock_content";
};
export type MapBlock_content$data = MapBlock_content;
export type MapBlock_content$key = {
    readonly " $data"?: MapBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"MapBlock_content">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MapBlock_content",
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
      "name": "bubbleText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LatLonField",
      "kind": "LinkedField",
      "name": "gps",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "latitude",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "longitude",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MapBlockRecord",
  "abstractKey": null
};
(node as any).hash = '1cad9dd51a91fb340bc6d6645c846a53';
export default node;
