import React, { useState, ReactElement } from 'react';
import parse from 'html-react-parser';
import styles from './GoogleMap.module.scss';
import { GoogleMap as GoogleMapComponent, Marker, LoadScript, InfoBox } from '@react-google-maps/api';

export interface GoogleMapProps {
    readonly isMarkerShown: boolean;
    readonly latitude: string;
    readonly longitude: string;
    readonly bubbleText: string;
    readonly apiKey?: string;
}

interface TooltipProps {
    readonly text: string;
}

export const MapComponent = <div className={styles.map} />;
export const LoadingComponent = <div className={styles.loading} />;
export const ContainerComponent = <div className={styles.container} />;

const TooltipComponent = ({ text }: TooltipProps): ReactElement<TooltipProps, 'div'> | null => (
    <div className={styles.tooltip}>{parse(text)}</div>
);

const GoogleMap = ({
    isMarkerShown,
    bubbleText,
    latitude,
    longitude,
    apiKey,
}: GoogleMapProps): ReactElement<GoogleMapProps, 'div'> | null => {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <LoadScript
                id="script-loader"
                googleMapsApiKey={apiKey || ''}
                loadingElement={<div className={styles.loading} />}
            >
                <GoogleMapComponent
                    zoom={8}
                    center={{ lat: latitude, lng: longitude }}
                    mapContainerClassName={styles.container}
                >
                    {isMarkerShown && (
                        <>
                            <Marker position={{ lat: latitude, lng: longitude }} onClick={(): void => setVisible(true)}>
                                {bubbleText && visible && (
                                    <InfoBox onCloseClick={(): void => setVisible(false)}>
                                        <TooltipComponent text={bubbleText} />
                                    </InfoBox>
                                )}
                            </Marker>
                        </>
                    )}
                </GoogleMapComponent>
            </LoadScript>
        </div>
    );
};

GoogleMap.whyDidYouRender = true;

export { GoogleMap };
