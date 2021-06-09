/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CarouselBlock_content = {
    readonly id: string;
    readonly textAlign: string | null;
    readonly autoplay: boolean | null;
    readonly interval: number | null;
    readonly banners: ReadonlyArray<{
        readonly id: string;
        readonly image: {
            readonly id: number;
            readonly url: string;
            readonly width: number | null;
            readonly height: number | null;
            readonly alt: string | null;
            readonly title: string | null;
        } | null;
        readonly video: {
            readonly id: number;
            readonly width: number | null;
            readonly height: number | null;
            readonly video: {
                readonly streamingUrl: string;
                readonly thumbnailUrl: string;
            } | null;
        } | null;
        readonly headline: string | null;
        readonly description: string | null;
        readonly textAlign: string | null;
    }>;
    readonly " $refType": "CarouselBlock_content";
};
export type CarouselBlock_content$data = CarouselBlock_content;
export type CarouselBlock_content$key = {
    readonly " $data"?: CarouselBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"CarouselBlock_content">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "textAlign",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CarouselBlock_content",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
      "kind": "ScalarField",
      "name": "interval",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "BannerRecord",
      "kind": "LinkedField",
      "name": "banners",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "FileField",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            },
            (v2/*: any*/),
            (v3/*: any*/),
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
            (v2/*: any*/),
            (v3/*: any*/),
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "headline",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "CarouselBlockRecord",
  "abstractKey": null
};
})();
(node as any).hash = 'fd00a611953fcf00bbced33974aefc89';
export default node;
