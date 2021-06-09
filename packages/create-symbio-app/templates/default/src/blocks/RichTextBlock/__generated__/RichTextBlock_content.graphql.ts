/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RichTextBlock_content = {
    readonly id: string;
    readonly text: string | null;
    readonly " $refType": "RichTextBlock_content";
};
export type RichTextBlock_content$data = RichTextBlock_content;
export type RichTextBlock_content$key = {
    readonly " $data"?: RichTextBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"RichTextBlock_content">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RichTextBlock_content",
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
      "name": "text",
      "storageKey": null
    }
  ],
  "type": "RichTextBlockRecord",
  "abstractKey": null
};
(node as any).hash = 'ca231aed21653fb55fd6c2756fd2f405';
export default node;
