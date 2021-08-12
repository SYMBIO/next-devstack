/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ItemStatus = "draft" | "published" | "updated" | "%future added value";
export type SiteLocale = "cs" | "en" | "%future added value";
export type FormModelFilter = {
    _createdAt?: CreatedAtFilter | null;
    createdAt?: CreatedAtFilter | null;
    id?: ItemIdFilter | null;
    _firstPublishedAt?: PublishedAtFilter | null;
    _publicationScheduledAt?: PublishedAtFilter | null;
    _unpublishingScheduledAt?: PublishedAtFilter | null;
    _publishedAt?: PublishedAtFilter | null;
    _status?: StatusFilter | null;
    _updatedAt?: UpdatedAtFilter | null;
    updatedAt?: UpdatedAtFilter | null;
    _isValid?: BooleanFilter | null;
    sendToRecipient?: BooleanFilter | null;
    recipientText?: TextFilter | null;
    title?: StringFilter | null;
    successMessage?: TextFilter | null;
    submitLabel?: StringFilter | null;
    emails?: StringFilter | null;
    OR?: Array<FormModelFilter | null> | null;
};
export type CreatedAtFilter = {
    gt?: string | null;
    lt?: string | null;
    gte?: string | null;
    lte?: string | null;
    exists?: boolean | null;
    eq?: string | null;
    neq?: string | null;
};
export type ItemIdFilter = {
    eq?: string | null;
    neq?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
};
export type PublishedAtFilter = {
    gt?: string | null;
    lt?: string | null;
    gte?: string | null;
    lte?: string | null;
    exists?: boolean | null;
    eq?: string | null;
    neq?: string | null;
};
export type StatusFilter = {
    eq?: ItemStatus | null;
    neq?: ItemStatus | null;
    in?: Array<ItemStatus | null> | null;
    notIn?: Array<ItemStatus | null> | null;
};
export type UpdatedAtFilter = {
    gt?: string | null;
    lt?: string | null;
    gte?: string | null;
    lte?: string | null;
    exists?: boolean | null;
    eq?: string | null;
    neq?: string | null;
};
export type BooleanFilter = {
    eq?: boolean | null;
};
export type TextFilter = {
    matches?: StringMatchesFilter | null;
    notMatches?: StringMatchesFilter | null;
    isBlank?: boolean | null;
    exists?: boolean | null;
};
export type StringMatchesFilter = {
    pattern: string;
    caseSensitive?: boolean | null;
    regexp?: boolean | null;
};
export type StringFilter = {
    matches?: StringMatchesFilter | null;
    notMatches?: StringMatchesFilter | null;
    isBlank?: boolean | null;
    eq?: string | null;
    neq?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
    exists?: boolean | null;
};
export type saveFormQueryVariables = {
    locale?: SiteLocale | null;
    filter?: FormModelFilter | null;
};
export type saveFormQueryResponse = {
    readonly form: {
        readonly id: string;
        readonly title: string | null;
        readonly emails: string | null;
        readonly sendToRecipient: boolean | null;
        readonly recipientText: string | null;
        readonly content: ReadonlyArray<({
            readonly __typename: "SingleLineInputRecord";
            readonly id: string;
            readonly label: string | null;
        } | {
            readonly __typename: "TextareaRecord";
            readonly id: string;
            readonly label: string | null;
        } | {
            readonly __typename: "CheckboxRecord";
            readonly id: string;
            readonly label: string | null;
        } | {
            readonly __typename: "ChoiceRecord";
            readonly id: string;
            readonly label: string | null;
        } | {
            readonly __typename: "FieldsetRecord";
            readonly legend: string | null;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        }) | null> | null;
    } | null;
};
export type saveFormQuery = {
    readonly response: saveFormQueryResponse;
    readonly variables: saveFormQueryVariables;
};



/*
query saveFormQuery(
  $locale: SiteLocale
  $filter: FormModelFilter
) {
  form(locale: $locale, filter: $filter) {
    id
    title
    emails
    sendToRecipient
    recipientText
    content {
      __typename
      ... on SingleLineInputRecord {
        id
        label
      }
      ... on TextareaRecord {
        id
        label
      }
      ... on CheckboxRecord {
        id
        label
      }
      ... on ChoiceRecord {
        id
        label
      }
      ... on FieldsetRecord {
        legend
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "locale"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "label",
    "storageKey": null
  }
],
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filter"
      },
      {
        "kind": "Variable",
        "name": "locale",
        "variableName": "locale"
      }
    ],
    "concreteType": "FormRecord",
    "kind": "LinkedField",
    "name": "form",
    "plural": false,
    "selections": [
      (v2/*: any*/),
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
        "name": "emails",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "sendToRecipient",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "recipientText",
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
            "selections": (v3/*: any*/),
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
            "selections": (v3/*: any*/),
            "type": "CheckboxRecord",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v3/*: any*/),
            "type": "ChoiceRecord",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
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
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "saveFormQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "saveFormQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "c190fc3d02d937d7420d211e1235e328",
    "id": null,
    "metadata": {},
    "name": "saveFormQuery",
    "operationKind": "query",
    "text": "query saveFormQuery(\n  $locale: SiteLocale\n  $filter: FormModelFilter\n) {\n  form(locale: $locale, filter: $filter) {\n    id\n    title\n    emails\n    sendToRecipient\n    recipientText\n    content {\n      __typename\n      ... on SingleLineInputRecord {\n        id\n        label\n      }\n      ... on TextareaRecord {\n        id\n        label\n      }\n      ... on CheckboxRecord {\n        id\n        label\n      }\n      ... on ChoiceRecord {\n        id\n        label\n      }\n      ... on FieldsetRecord {\n        legend\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '303808fe0b325da2d869ec811deade43';
export default node;
