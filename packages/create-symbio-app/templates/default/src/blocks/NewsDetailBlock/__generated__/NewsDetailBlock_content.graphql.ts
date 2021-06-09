/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NewsDetailBlock_content = {
    readonly id: string;
    readonly " $refType": "NewsDetailBlock_content";
};
export type NewsDetailBlock_content$data = NewsDetailBlock_content;
export type NewsDetailBlock_content$key = {
    readonly " $data"?: NewsDetailBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"NewsDetailBlock_content">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewsDetailBlock_content",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "NewsDetailBlockRecord",
  "abstractKey": null
};
(node as any).hash = '295b73e0bafe7231af28ca3621bd4515';
export default node;
