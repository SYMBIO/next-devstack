/**
 * Import blocks which should be included in SSR
 */
import './RichTextBlock/RichTextBlock';
import './CmsFormBlock/CmsFormBlock';
import './GalleryBlock/GalleryBlock';
import './ImageBlock/ImageBlock';
import './VideoBlock/VideoBlock';
import './YoutubeVimeoBlock/YoutubeVimeoBlock';
import './MapBlock/MapBlock';
import './ButtonBlock/ButtonBlock';
import './HorizontalRuleBlock/HorizontalRuleBlock';
import './NewsListBlock/NewsListBlock';
import './SliderBlock/SliderBlock';
import './NewsDetailBlock/NewsDetailBlock';
import './NewsListFloorBlock/NewsListFloorBlock';

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
        ...NewsListBlock_content @relay(mask: false)
        ...SliderBlock_content @relay(mask: false)
        ...NewsListFloorBlock_content @relay(mask: false)
    }
`;
