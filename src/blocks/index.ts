/**
 * Import blocks which should be included in SSR
 */
import './RichTextBlock/RichTextBlock';
import './SliderBlock/SliderBlock';
import './NewsListBlock/NewsListBlock';
import './HorizontalRuleBlock/HorizontalRuleBlock';

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';

graphql`
    fragment blocksContent on PageModelContentField {
        __typename
        ...RichTextBlock_content @relay(mask: false)
        ...SliderBlock_content @relay(mask: false)
        ...NewsListBlock_content @relay(mask: false)
    }
`;
