import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, Button } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import styles from './ButtonBlock.module.scss';

graphql`
    fragment ButtonBlock_content on ButtonBlockRecord {
        id
        file {
            ...appImageFragment @relay(mask: false)
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

BlockRegistry.set('ButtonBlock', ButtonBlock);
