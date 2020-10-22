/**
 * Import blocks which should be included in SSR
 */
import dynamic from 'next/dynamic';
import { BlockType } from '../types/block';

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';

graphql`
    fragment blocksContent on PageModelContentField {
        __typename
        ...RichTextBlock_content @relay(mask: false)
        ...CmsFormBlock_content @relay(mask: false)
        ...GalleryBlock_content @relay(mask: false)
        ...ImageBlock_content @relay(mask: false)
        ...VideoBlock_content @relay(mask: false)
        ...YoutubeVimeoBlock_content @relay(mask: false)
        ...MapBlock_content @relay(mask: false)
        ...ButtonBlock_content @relay(mask: false)
        ...SliderBlock_content @relay(mask: false)
        ...NewsListFloorBlock_content @relay(mask: false)
        ...SubpageListBlock_content @relay(mask: false)
    }
`;

const blocks: { [name: string]: BlockType } = {
    RichTextBlock: dynamic(() => import('./RichTextBlock/RichTextBlock')),
    CmsFormBlock: dynamic(() => import('./CmsFormBlock/CmsFormBlock')),
    GalleryBlock: dynamic(() => import('./GalleryBlock/GalleryBlock')),
    ImageBlock: dynamic(() => import('./ImageBlock/ImageBlock')),
    VideoBlock: dynamic(() => import('./VideoBlock/VideoBlock')),
    YoutubeVimeoBlock: dynamic(() => import('./YoutubeVimeoBlock/YoutubeVimeoBlock')),
    MapBlock: dynamic(() => import('./MapBlock/MapBlock')),
    ButtonBlock: dynamic(() => import('./ButtonBlock/ButtonBlock')),
    HorizontalRuleBlock: dynamic(() => import('./HorizontalRuleBlock/HorizontalRuleBlock')),
    NewsListBlock: dynamic(() => import('./NewsListBlock/NewsListBlock')),
    SliderBlock: dynamic(() => import('./SliderBlock/SliderBlock')),
    NewsDetailBlock: dynamic(() => import('./NewsDetailBlock/NewsDetailBlock')),
    NewsListFloorBlock: dynamic(() => import('./NewsListFloorBlock/NewsListFloorBlock')),
    SubpageListBlock: dynamic(() => import('./SubpageListBlock/SubpageListBlock')),
};

export default blocks;
