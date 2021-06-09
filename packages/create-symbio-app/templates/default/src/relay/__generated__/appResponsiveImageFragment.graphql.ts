/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type appResponsiveImageFragment = {
    readonly srcSet: string;
    readonly webpSrcSet: string;
    readonly sizes: string;
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly aspectRatio: number;
    readonly alt: string | null;
    readonly title: string | null;
    readonly base64: string | null;
    readonly " $refType": "appResponsiveImageFragment";
};
export type appResponsiveImageFragment$data = appResponsiveImageFragment;
export type appResponsiveImageFragment$key = {
    readonly " $data"?: appResponsiveImageFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"appResponsiveImageFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "appResponsiveImageFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "srcSet",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "webpSrcSet",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sizes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "src",
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
      "name": "aspectRatio",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "base64",
      "storageKey": null
    }
  ],
  "type": "ResponsiveImage",
  "abstractKey": null
};
(node as any).hash = '84ac97718af2c0611f5e62eb87b7fd4d';
export default node;
