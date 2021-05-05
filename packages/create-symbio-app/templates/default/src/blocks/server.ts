/**
 * Import blocks which should be included in SSR
 */
import { BlockType } from '@symbio/headless/types/block';

import ButtonBlock from './ButtonBlock/ButtonBlock';
import CarouselBlock from './CarouselBlock/CarouselBlock';
import CmsFormBlock from './CmsFormBlock/CmsFormBlock';
import Error404Block from './Error404Block/Error404Block';
import GalleryBlock from './GalleryBlock/GalleryBlock';
import ImageBlock from './ImageBlock/ImageBlock';
import MapBlock from './MapBlock/MapBlock';
import NewsDetailBlock from './NewsDetailBlock/NewsDetailBlock';
import NewsListBlock from './NewsListBlock/NewsListBlock';
import NewsListFloorBlock from './NewsListFloorBlock/NewsListFloorBlock';
import RichTextBlock from './RichTextBlock/RichTextBlock';
import SubpageListBlock from './SubpageListBlock/SubpageListBlock';
import VideoBlock from './VideoBlock/VideoBlock';
import YoutubeVimeoBlock from './YoutubeVimeoBlock/YoutubeVimeoBlock';

/**
 * Define fragment for blocks to load with app data
 */
import graphql from 'graphql-tag';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';

graphql`
    fragment serverBlocksContent on PageModelContentField {
        __typename
        ...ButtonBlock_content @relay(mask: false)
        ...CarouselBlock_content @relay(mask: false)
        ...CmsFormBlock_content @relay(mask: false)
        ...Error404Block_content @relay(mask: false)
        ...GalleryBlock_content @relay(mask: false)
        ...ImageBlock_content @relay(mask: false)
        ...MapBlock_content @relay(mask: false)
        ...NewsDetailBlock_content @relay(mask: false)
        ...NewsListFloorBlock_content @relay(mask: false)
        ...RichTextBlock_content @relay(mask: false)
        ...SubpageListBlock_content @relay(mask: false)
        ...VideoBlock_content @relay(mask: false)
        ...YoutubeVimeoBlock_content @relay(mask: false)
    }
`;

const blocks: { [name: string]: BlockType<PageProps, WebSettingsProps> } = {
    ButtonBlock,
    CarouselBlock,
    CmsFormBlock,
    Error404Block,
    GalleryBlock,
    ImageBlock,
    MapBlock,
    NewsDetailBlock,
    NewsListBlock,
    NewsListFloorBlock,
    RichTextBlock,
    SubpageListBlock,
    VideoBlock,
    YoutubeVimeoBlock,
};

export default blocks;
