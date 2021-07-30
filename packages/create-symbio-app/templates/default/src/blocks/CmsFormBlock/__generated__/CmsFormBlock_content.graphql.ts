/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CmsFormBlock_content = {
    readonly id: string;
    readonly form: {
        readonly id: string;
        readonly title: string | null;
        readonly submitLabel: string | null;
        readonly successMessage: string | null;
        readonly content: ReadonlyArray<({
            readonly __typename: "SingleLineInputRecord";
            readonly id: string;
            readonly label: string | null;
            readonly placeholder: string | null;
            readonly required: boolean | null;
            readonly hint: string | null;
            readonly variant: string | null;
        } | {
            readonly __typename: "TextareaRecord";
            readonly id: string;
            readonly label: string | null;
            readonly required: boolean | null;
        } | {
            readonly __typename: "FieldsetRecord";
            readonly id: string;
            readonly legend: string | null;
        } | {
            readonly __typename: "CheckboxRecord";
            readonly id: string;
            readonly label: string | null;
            readonly required: boolean | null;
        } | {
            readonly __typename: "ChoiceRecord";
            readonly id: string;
            readonly label: string | null;
            readonly required: boolean | null;
            readonly choices: unknown | null;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        }) | null> | null;
    } | null;
    readonly " $refType": "CmsFormBlock_content";
};
export type CmsFormBlock_content$data = CmsFormBlock_content;
export type CmsFormBlock_content$key = {
    readonly " $data"?: CmsFormBlock_content$data;
    readonly " $fragmentRefs": FragmentRefs<"CmsFormBlock_content">;
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
  "name": "label",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "required",
  "storageKey": null
},
v3 = [
  (v0/*: any*/),
  (v1/*: any*/),
  (v2/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CmsFormBlock_content",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "FormRecord",
      "kind": "LinkedField",
      "name": "form",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
          "name": "submitLabel",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "successMessage",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "content",
          "plural": true,
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "placeholder",
                  "storageKey": null
                },
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "hint",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "variant",
                  "storageKey": null
                }
              ],
              "type": "SingleLineInputRecord",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v3/*: any*/),
              "type": "TextareaRecord",
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
                  "name": "legend",
                  "storageKey": null
                }
              ],
              "type": "FieldsetRecord",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v3/*: any*/),
              "type": "CheckboxRecord",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "choices",
                  "storageKey": null
                }
              ],
              "type": "ChoiceRecord",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CmsFormBlockRecord",
  "abstractKey": null
};
})();
(node as any).hash = '59b892cbac71d7bcbc10650fa54a3930';
export default node;
