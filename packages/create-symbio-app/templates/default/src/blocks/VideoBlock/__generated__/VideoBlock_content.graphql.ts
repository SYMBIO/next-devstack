/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VideoBlock_content = {
    readonly id: string;
    readonly autoplay: boolean | null;
    readonly video: {
        readonly id: number;
        readonly width: number | null;
        readonly height: number | null;
        readonly video: {
            readonly streamingUrl: string;
            readonly thumbnailUrl: string;
        } | null;
    } | null;
    readonly " $refType": "VideoBlock_content";
};
export type VideoBlock_content$data = VideoBlock_content;
export type VideoBlock_content$key = {
    readonly " $data"?: VideoBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"VideoBlock_content">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VideoBlock_content",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "autoplay",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "video",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
          "concreteType": "UploadVideoField",
          "kind": "LinkedField",
          "name": "video",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "streamingUrl",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "thumbnailUrl",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "VideoBlockRecord",
  "abstractKey": null
};
})();
(node as any).hash = '0c576b0cb766e04ef014ebc33e05fbc6';
export default node;
