import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { CmsForm } from '../../components/organisms/CmsForm/CmsForm';
import { CmsFormBlock_content } from './__generated__/CmsFormBlock_content.graphql';
import styles from './CmsFormBlock.module.scss';

interface CmsFormBlockProps {
    content: CmsFormBlock_content;
}

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

function CmsFormBlock({ content }: CmsFormBlockProps): ReactElement | null {
    if (content.form?.content && content.form?.submitLabel && content.form.successMessage) {
        return (
            <BlockWrapper tooltip={'CmsFormBlock'}>
                <CmsForm {...content} />
            </BlockWrapper>
        );
    }

    return null;
}

CmsFormBlock.whyDidYouRender = true;

export default CmsFormBlock;
