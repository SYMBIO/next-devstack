/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SubpageListBlock_content = {
    readonly id: string;
    readonly page: {
        readonly __typename: string;
        readonly id: string;
        readonly url: string | null;
        readonly title: string | null;
    } | null;
    readonly sortAlphabetically: boolean | null;
    readonly heading: string | null;
    readonly " $refType": "SubpageListBlock_content";
};
export type SubpageListBlock_content$data = SubpageListBlock_content;
export type SubpageListBlock_content$key = {
    readonly " $data"?: SubpageListBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"SubpageListBlock_content">;
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
  "name": "SubpageListBlock_content",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "page",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        (v0/*: any*/),
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
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sortAlphabetically",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "heading",
      "storageKey": null
    }
  ],
  "type": "SubpageListBlockRecord",
  "abstractKey": null
};
})();
(node as any).hash = 'a8a3fec6e51d62a8e11911ff67d5f34e';
export default node;
