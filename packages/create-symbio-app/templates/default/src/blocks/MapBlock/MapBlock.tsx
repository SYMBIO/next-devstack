import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { GoogleMap } from '../../components/primitives/GoogleMap/GoogleMap';
import { MapBlock_content } from './__generated__/MapBlock_content.graphql';

export interface MapBlockProps {
    content: MapBlock_content
};

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

function MapBlock({ content, ...rest }: MapBlockProps): ReactElement<MapBlockProps, 'BaseBlock'> {
    if(!content.gps || !content.gps.latitude || !content.gps.longitude) {
        return <></>
    }
    return (
        <BlockWrapper tooltip={'MapBlock'} {...rest}>
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
