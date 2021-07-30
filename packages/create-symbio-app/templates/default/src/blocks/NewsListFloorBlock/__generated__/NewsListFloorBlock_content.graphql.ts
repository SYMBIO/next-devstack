/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NewsListFloorBlock_content = {
    readonly id: string;
    readonly allNewsPage: {
        readonly id: string;
        readonly url: string | null;
    } | null;
    readonly allNewsLinkText: string | null;
    readonly categories: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly count: number | null;
    readonly heading: string | null;
    readonly " $refType": "NewsListFloorBlock_content";
};
export type NewsListFloorBlock_content$data = NewsListFloorBlock_content;
export type NewsListFloorBlock_content$key = {
    readonly " $data"?: NewsListFloorBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"NewsListFloorBlock_content">;
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
  "name": "NewsListFloorBlock_content",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PageRecord",
      "kind": "LinkedField",
      "name": "allNewsPage",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allNewsLinkText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "NewsCategoryRecord",
      "kind": "LinkedField",
      "name": "categories",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "count",
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
  "type": "NewsListFloorBlockRecord",
  "abstractKey": null
};
})();
(node as any).hash = '21ec2f9b0b49c86b0ef9ffebd89ce2ff';
export default node;
