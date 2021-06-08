/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type appFileFragment = {
    readonly id: string;
    readonly title: string | null;
    readonly url: string;
    readonly filename: string;
    readonly format: string;
    readonly size: number;
    readonly " $refType": "appFileFragment";
};
export type appFileFragment$data = appFileFragment;
export type appFileFragment$key = {
    readonly " $data"?: appFileFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"appFileFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "appFileFragment",
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
      "name": "title",
      "storageKey": null
    },
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
      "name": "filename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "format",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "size",
      "storageKey": null
    }
  ],
  "type": "FileField",
  "abstractKey": null
};
(node as any).hash = '4333b8c9d655a1b46bcba21ae93a2bf5';
export default node;
