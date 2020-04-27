import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, GoogleMap } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../../types/block';
import styles from './MapBlock.module.scss';

graphql`
    fragment MapBlock_content on MapRecord {
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
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div className={styles.loading} />}
                containerElement={<div className={styles.container} />}
                mapElement={<div className={styles.map} />}
                latitude={content.gps ? content.gps.latitude : 0}
                longitude={content.gps ? content.gps.longitude : 0}
                bubbleText={content.bubbleText}
            />
        </BlockWrapper>
    );
}

BlockFactory.set('MapBlock', MapBlock);
