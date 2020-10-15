import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BaseBlockProps } from '../../types/block';
import styles from './MapBlock.module.scss';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { GoogleMap } from '../../components/primitives/GoogleMap/GoogleMap';

graphql`
    fragment MapBlock_content on MapBlockRecord {
        id
        bubbleText
        gps {
            latitude
            longitude
        }
    }
`;

function MapBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'MapBlock'} className={styles.wrapper} {...rest}>
            <GoogleMap
                isMarkerShown
                latitude={content.gps ? content.gps.latitude : 0}
                longitude={content.gps ? content.gps.longitude : 0}
                bubbleText={content.bubbleText}
            />
        </BlockWrapper>
    );
}

MapBlock.whyDidYouRender = true;

export default MapBlock;
