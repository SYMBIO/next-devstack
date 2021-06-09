/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type serverBlocksContent = {
    readonly __typename: "ButtonBlockRecord";
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
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "CarouselBlockRecord";
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
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "CmsFormBlockRecord";
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
            readonly choices: any | null;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        }) | null> | null;
    } | null;
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "Error404BlockRecord";
    readonly id: string;
    readonly description: string | null;
    readonly headline: string | null;
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "GalleryBlockRecord";
    readonly assets: ReadonlyArray<{
        readonly id: number;
        readonly url: string;
        readonly width: number | null;
        readonly height: number | null;
        readonly alt: string | null;
        readonly title: string | null;
    }>;
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "ImageBlockRecord";
    readonly id: string;
    readonly image: {
        readonly id: number;
        readonly url: string;
        readonly width: number | null;
        readonly height: number | null;
        readonly alt: string | null;
        readonly title: string | null;
    } | null;
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "MapBlockRecord";
    readonly id: string;
    readonly bubbleText: string | null;
    readonly gps: {
        readonly latitude: number | null;
        readonly longitude: number | null;
    } | null;
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "NewsDetailBlockRecord";
    readonly id: string;
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "NewsListFloorBlockRecord";
    readonly id: string;
    readonly allNewsPage: {
        readonly url: string | null;
    } | null;
    readonly allNewsLinkText: string | null;
    readonly categories: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly count: number | null;
    readonly heading: string | null;
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "RichTextBlockRecord";
    readonly id: string;
    readonly text: string | null;
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "SubpageListBlockRecord";
    readonly id: string;
    readonly page: {
        readonly __typename: string;
        readonly id: string;
        readonly url: string | null;
        readonly title: string | null;
    } | null;
    readonly sortAlphabetically: boolean | null;
    readonly heading: string | null;
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "VideoBlockRecord";
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
    readonly " $refType": "serverBlocksContent";
} | {
    readonly __typename: "YoutubeVimeoBlockRecord";
    readonly id: string;
    readonly video: {
        readonly provider: string | null;
        readonly providerUid: string | null;
        readonly width: number | null;
        readonly height: number | null;
    } | null;
    readonly " $refType": "serverBlocksContent";
} | {
    /*This will never be '%other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
    readonly " $refType": "serverBlocksContent";
};
export type serverBlocksContent$data = serverBlocksContent;
export type serverBlocksContent$key = {
    readonly " $data"?: serverBlocksContent$data;
    readonly " $fragmentRefs": FragmentRefs<"serverBlocksContent">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v4 = [
  (v1/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "textAlign",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "autoplay",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v10 = [
  (v1/*: any*/),
  (v3/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "alt",
    "storageKey": null
  },
  (v2/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "FileField",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "FileField",
  "kind": "LinkedField",
  "name": "video",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/),
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
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headline",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "required",
  "storageKey": null
},
v16 = [
  (v1/*: any*/),
  (v5/*: any*/),
  (v15/*: any*/)
],
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "heading",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "serverBlocksContent",
  "selections": [
    (v0/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "FileField",
          "kind": "LinkedField",
          "name": "file",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "size",
              "storageKey": null
            },
            (v2/*: any*/),
            (v3/*: any*/)
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
          "selections": (v4/*: any*/),
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
            (v1/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": null
        },
        (v5/*: any*/)
      ],
      "type": "ButtonBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v1/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/),
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
            (v1/*: any*/),
            (v11/*: any*/),
            (v12/*: any*/),
            (v13/*: any*/),
            (v14/*: any*/),
            (v6/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "CarouselBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FormRecord",
          "kind": "LinkedField",
          "name": "form",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v2/*: any*/),
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
                (v0/*: any*/),
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v1/*: any*/),
                    (v5/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "placeholder",
                      "storageKey": null
                    },
                    (v15/*: any*/),
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
                  "selections": (v16/*: any*/),
                  "type": "TextareaRecord",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v1/*: any*/),
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
                  "selections": (v16/*: any*/),
                  "type": "CheckboxRecord",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v1/*: any*/),
                    (v5/*: any*/),
                    (v15/*: any*/),
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
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v1/*: any*/),
        (v14/*: any*/),
        (v13/*: any*/)
      ],
      "type": "Error404BlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FileField",
          "kind": "LinkedField",
          "name": "assets",
          "plural": true,
          "selections": (v10/*: any*/),
          "storageKey": null
        }
      ],
      "type": "GalleryBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v1/*: any*/),
        (v11/*: any*/)
      ],
      "type": "ImageBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v1/*: any*/),
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
      "selections": (v4/*: any*/),
      "type": "NewsDetailBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PageRecord",
          "kind": "LinkedField",
          "name": "allNewsPage",
          "plural": false,
          "selections": [
            (v3/*: any*/)
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
          "selections": (v4/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "count",
          "storageKey": null
        },
        (v17/*: any*/)
      ],
      "type": "NewsListFloorBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v1/*: any*/),
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
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PageRecord",
          "kind": "LinkedField",
          "name": "page",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v3/*: any*/),
            (v2/*: any*/)
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
        (v17/*: any*/)
      ],
      "type": "SubpageListBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v1/*: any*/),
        (v7/*: any*/),
        (v12/*: any*/)
      ],
      "type": "VideoBlockRecord",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v1/*: any*/),
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
            (v8/*: any*/),
            (v9/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "YoutubeVimeoBlockRecord",
      "abstractKey": null
    }
  ],
  "type": "PageModelContentField",
  "abstractKey": "__isPageModelContentField"
};
})();
(node as any).hash = '4334cb08d325e6ca418b968deeaaf6f3';
export default node;
