/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NewsListBlock_content = {
    readonly id: string;
    readonly " $refType": "NewsListBlock_content";
};
export type NewsListBlock_content$data = NewsListBlock_content;
export type NewsListBlock_content$key = {
    readonly " $data"?: NewsListBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"NewsListBlock_content">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewsListBlock_content",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "NewsListBlockRecord",
  "abstractKey": null
};
(node as any).hash = '0b39ee898c36e76f1c27884ca2835c84';
export default node;
