/**
 * Import blocks which should be included in SSR
 */
import { BlockType } from '../types/block';

import RichTextBlock from './RichTextBlock/RichTextBlock';
import CmsFormBlock from './CmsFormBlock/CmsFormBlock';
import GalleryBlock from './GalleryBlock/GalleryBlock';
import ImageBlock from './ImageBlock/ImageBlock';
import VideoBlock from './VideoBlock/VideoBlock';
import YoutubeVimeoBlock from './YoutubeVimeoBlock/YoutubeVimeoBlock';
import MapBlock from './MapBlock/MapBlock';
import ButtonBlock from './ButtonBlock/ButtonBlock';
import HorizontalRuleBlock from './HorizontalRuleBlock/HorizontalRuleBlock';
import NewsListBlock from './NewsListBlock/NewsListBlock';
import CarouselBlock from './CarouselBlock/CarouselBlock';
import NewsDetailBlock from './NewsDetailBlock/NewsDetailBlock';
import NewsListFloorBlock from './NewsListFloorBlock/NewsListFloorBlock';
import SubpageListBlock from './SubpageListBlock/SubpageListBlock';

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';

graphql`
    fragment serverBlocksContent on PageModelContentField {
        __typename
        ...RichTextBlock_content @relay(mask: false)
        ...CmsFormBlock_content @relay(mask: false)
        ...GalleryBlock_content @relay(mask: false)
        ...ImageBlock_content @relay(mask: false)
        ...VideoBlock_content @relay(mask: false)
        ...YoutubeVimeoBlock_content @relay(mask: false)
        ...MapBlock_content @relay(mask: false)
        ...ButtonBlock_content @relay(mask: false)
        ...CarouselBlock_content @relay(mask: false)
        ...NewsListFloorBlock_content @relay(mask: false)
        ...SubpageListBlock_content @relay(mask: false)
    }
`;

const blocks: { [name: string]: BlockType } = {
    RichTextBlock,
    CmsFormBlock,
    GalleryBlock,
    ImageBlock,
    VideoBlock,
    YoutubeVimeoBlock,
    MapBlock,
    ButtonBlock,
    HorizontalRuleBlock,
    NewsListBlock,
    CarouselBlock,
    NewsDetailBlock,
    NewsListFloorBlock,
    SubpageListBlock,
};

export default blocks;
