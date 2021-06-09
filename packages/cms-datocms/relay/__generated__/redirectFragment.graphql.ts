/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type redirectFragment = {
    readonly id: string;
    readonly from: string | null;
    readonly to: string | null;
    readonly permanent: boolean | null;
    readonly " $refType": "redirectFragment";
};
export type redirectFragment$data = redirectFragment;
export type redirectFragment$key = {
    readonly " $data"?: redirectFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"redirectFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "redirectFragment",
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
      "name": "from",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "to",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "permanent",
      "storageKey": null
    }
  ],
  "type": "RedirectRecord",
  "abstractKey": null
};
(node as any).hash = '491d1ed18f5f5c5328a47b12fc4ab42e';
export default node;
