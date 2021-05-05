import { useState, useEffect } from 'react';

interface DimensionsProps {
    width: number;
    height: number;
}

function getWindowDimensions(): DimensionsProps {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

export const useDimensions = (): DimensionsProps | null => {
    const [windowDimensions, setWindowDimensions] = useState<DimensionsProps | null>(null);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        setWindowDimensions(getWindowDimensions());

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowDimensions]);

    return windowDimensions;
};
