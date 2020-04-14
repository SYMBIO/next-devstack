/**
 * Import blocks which should be included in SSR
 */
import './RichTextBlock';
import './SliderBlock';
import './NewsListBlock';

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
