/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Error404Block_content = {
    readonly id: string;
    readonly description: string | null;
    readonly headline: string | null;
    readonly " $refType": "Error404Block_content";
};
export type Error404Block_content$data = Error404Block_content;
export type Error404Block_content$key = {
    readonly " $data"?: Error404Block_content$data;
    readonly " $fragmentRefs": FragmentRefs<"Error404Block_content">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Error404Block_content",
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
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "headline",
      "storageKey": null
    }
  ],
  "type": "Error404BlockRecord",
  "abstractKey": null
};
(node as any).hash = '9ac64cac65d87cc149cb639d3cabe071';
export default node;
