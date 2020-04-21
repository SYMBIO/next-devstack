import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, Button } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../../types/block';
import styles from './ButtonBlock.module.scss';

graphql`
    fragment ButtonBlock_content on ButtonRecord {
        id
        file {
            id
            url
            width
            height
        }
        icon {
            id
        }
        page {
            id
        }
        label
    }
`;

function ButtonBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'ButtonBlock'} className={styles.wrapper} {...rest}>
            <Button icon={content.icon} href={content.page}>
                {content.label}
            </Button>
        </BlockWrapper>
    );
}

BlockFactory.set('ButtonBlock', ButtonBlock);
