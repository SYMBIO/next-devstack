/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type YoutubeVimeoBlock_content = {
    readonly id: string;
    readonly video: {
        readonly provider: string | null;
        readonly providerUid: string | null;
        readonly width: number | null;
        readonly height: number | null;
    } | null;
    readonly " $refType": "YoutubeVimeoBlock_content";
};
export type YoutubeVimeoBlock_content$data = YoutubeVimeoBlock_content;
export type YoutubeVimeoBlock_content$key = {
    readonly " $data"?: YoutubeVimeoBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"YoutubeVimeoBlock_content">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "YoutubeVimeoBlock_content",
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
      "concreteType": "VideoField",
      "kind": "LinkedField",
      "name": "video",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "provider",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "providerUid",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "YoutubeVimeoBlockRecord",
  "abstractKey": null
};
(node as any).hash = 'f3315f188c74703aab67a05c1e9490a1';
export default node;
