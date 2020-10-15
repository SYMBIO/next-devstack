import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import styles from './CmsFormBlock.module.scss';
import { Slider } from '../../components/organisms/Slider/Slider';

graphql`
    fragment CmsFormBlock_content on CmsFormBlockRecord {
        form {
            id
            title
            submitLabel
            successMessage
            content {
                __typename
                ... on SingleLineInputRecord {
                    id
                    label
                    placeholder
                    required
                    hint
                    variant
                }
                ... on TextareaRecord {
                    id
                    label
                    required
                }
                ... on FieldsetRecord {
                    id
                    legend
                }
                ... on CheckboxRecord {
                    id
                    label
                    required
                }
                ... on ChoiceRecord {
                    id
                    label
                    required
                    choices
                }
            }
        }
    }
`;

function CmsFormBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'CmsFormBlock'} className={styles.wrapper} {...rest}>
            <Slider {...content} />
        </BlockWrapper>
    );
}

CmsFormBlock.whyDidYouRender = true;

BlockRegistry.set('CmsFormBlock', CmsFormBlock);
