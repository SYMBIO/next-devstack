/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type newsContentFragment = {
    readonly __typename: "GalleryBlockRecord";
    readonly id: string;
    readonly assets: ReadonlyArray<{
        readonly url: string;
        readonly width: number | null;
        readonly height: number | null;
        readonly alt: string | null;
        readonly title: string | null;
        readonly focalPoint: {
            readonly x: number | null;
            readonly y: number | null;
        } | null;
    }>;
    readonly " $refType": "newsContentFragment";
} | {
    readonly __typename: "ImageBlockRecord";
    readonly id: string;
    readonly image: {
        readonly url: string;
        readonly width: number | null;
        readonly height: number | null;
        readonly alt: string | null;
        readonly title: string | null;
        readonly focalPoint: {
            readonly x: number | null;
            readonly y: number | null;
        } | null;
    } | null;
    readonly " $refType": "newsContentFragment";
} | {
    readonly __typename: "MapBlockRecord";
    readonly id: string;
    readonly bubbleText: string | null;
    readonly gps: {
        readonly latitude: number | null;
        readonly longitude: number | null;
    } | null;
    readonly " $refType": "newsContentFragment";
} | {
    readonly __typename: "RichTextBlockRecord";
    readonly id: string;
    readonly text: string | null;
    readonly " $refType": "newsContentFragment";
} | {
    readonly __typename: "VideoBlockRecord";
    readonly id: string;
    readonly autoplay: boolean | null;
    readonly video: {
        readonly id: string;
        readonly width: number | null;
        readonly height: number | null;
        readonly video: {
            readonly streamingUrl: string;
            readonly thumbnailUrl: string;
        } | null;
    } | null;
    readonly " $refType": "newsContentFragment";
} | {
    readonly __typename: "YoutubeVimeoBlockRecord";
    readonly id: string;
    readonly video: {
        readonly provider: string | null;
        readonly providerUid: string | null;
        readonly width: number | null;
        readonly height: number | null;
        readonly title: string | null;
        readonly thumbnailUrl: string | null;
    } | null;
    readonly " $refType": "newsContentFragment";
} | {
    /*This will never be '%other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
    readonly " $refType": "newsContentFragment";
};
export type newsContentFragment$data = newsContentFragment;
export type newsContentFragment$key = {
    readonly " $data"?: newsContentFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"newsContentFragment">;
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
  "name": "width",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  },
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "alt",
    "storageKey": null
  },
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "focalPoint",
    "kind": "LinkedField",
    "name": "focalPoint",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "x",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "y",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "thumbnailUrl",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "newsContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "FileField",
          "kind": "LinkedField",
          "name": "assets",
          "plural": true,
          "selections": (v4/*: any*/),
          "storageKey": null
        }
      ],
      "type": "GalleryBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "FileField",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": (v4/*: any*/),
          "storageKey": null
        }
      ],
      "type": "ImageBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bubbleText",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "LatLonField",
          "kind": "LinkedField",
          "name": "gps",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "latitude",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "longitude",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "MapBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
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
    },
    {
      "kind": "InlineFragment",
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
            (v1/*: any*/),
            (v2/*: any*/),
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
                (v5/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "VideoBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
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
            (v1/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/),
            (v5/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "YoutubeVimeoBlockRecord",
      "abstractKey": null
    }
  ],
  "type": "NewsModelContentField",
  "abstractKey": "__isNewsModelContentField"
};
})();
(node as any).hash = '6b5b9e3aa8e2c1af5921512eb9af55d2';
export default node;
