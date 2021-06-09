/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type appImageBaseFragment = {
    readonly id: number;
    readonly url: string;
    readonly width: number | null;
    readonly height: number | null;
    readonly alt: string | null;
    readonly title: string | null;
    readonly " $refType": "appImageBaseFragment";
};
export type appImageBaseFragment$data = appImageBaseFragment;
export type appImageBaseFragment$key = {
    readonly " $data"?: appImageBaseFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"appImageBaseFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "appImageBaseFragment",
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
    }
  ],
  "type": "FileField",
  "abstractKey": null
};
(node as any).hash = 'b2f6a96b1b7e1f3beb5fee7e3014a86d';
export default node;
