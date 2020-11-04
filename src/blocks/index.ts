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
        ...ButtonBlock_content @relay(mask: false)
        ...CarouselBlock_content @relay(mask: false)
        ...CmsFormBlock_content @relay(mask: false)
        ...Error404Block_content @relay(mask: false)
        ...GalleryBlock_content @relay(mask: false)
        ...ImageBlock_content @relay(mask: false)
        ...MapBlock_content @relay(mask: false)
        ...NewsListFloorBlock_content @relay(mask: false)
        ...RichTextBlock_content @relay(mask: false)
        ...SubpageListBlock_content @relay(mask: false)
        ...VideoBlock_content @relay(mask: false)
        ...YoutubeVimeoBlock_content @relay(mask: false)
    }
`;

const blocks: { [name: string]: BlockType } = {
    ButtonBlock: dynamic(() => import('./ButtonBlock/ButtonBlock')),
    CarouselBlock: dynamic(() => import('./CarouselBlock/CarouselBlock')),
    CmsFormBlock: dynamic(() => import('./CmsFormBlock/CmsFormBlock')),
    Error404Block: dynamic(() => import('./Error404Block/Error404Block')),
    GalleryBlock: dynamic(() => import('./GalleryBlock/GalleryBlock')),
    HorizontalRuleBlock: dynamic(() => import('./HorizontalRuleBlock/HorizontalRuleBlock')),
    ImageBlock: dynamic(() => import('./ImageBlock/ImageBlock')),
    MapBlock: dynamic(() => import('./MapBlock/MapBlock')),
    NewsDetailBlock: dynamic(() => import('./NewsDetailBlock/NewsDetailBlock')),
    NewsListBlock: dynamic(() => import('./NewsListBlock/NewsListBlock')),
    NewsListFloorBlock: dynamic(() => import('./NewsListFloorBlock/NewsListFloorBlock')),
    RichTextBlock: dynamic(() => import('./RichTextBlock/RichTextBlock')),
    SubpageListBlock: dynamic(() => import('./SubpageListBlock/SubpageListBlock')),
    VideoBlock: dynamic(() => import('./VideoBlock/VideoBlock')),
    YoutubeVimeoBlock: dynamic(() => import('./YoutubeVimeoBlock/YoutubeVimeoBlock')),
};

export default blocks;
