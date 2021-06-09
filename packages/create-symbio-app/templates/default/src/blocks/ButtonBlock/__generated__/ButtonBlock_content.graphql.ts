/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ButtonBlock_content = {
    readonly id: string;
    readonly file: {
        readonly id: number;
        readonly size: number;
        readonly title: string | null;
        readonly url: string;
    } | null;
    readonly icon: {
        readonly id: string;
    } | null;
    readonly page: {
        readonly id: string;
        readonly url: string | null;
    } | null;
    readonly label: string | null;
    readonly " $refType": "ButtonBlock_content";
};
export type ButtonBlock_content$data = ButtonBlock_content;
export type ButtonBlock_content$key = {
    readonly " $data"?: ButtonBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"ButtonBlock_content">;
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
  "name": "url",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ButtonBlock_content",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "FileField",
      "kind": "LinkedField",
      "name": "file",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "size",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "IconRecord",
      "kind": "LinkedField",
      "name": "icon",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "page",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "label",
      "storageKey": null
    }
  ],
  "type": "ButtonBlockRecord",
  "abstractKey": null
};
})();
(node as any).hash = '93d31dbd1980f634f67e860e898226ef';
export default node;
