import React, { ReactElement } from 'react';

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        titleColor: 'green',
        diffNameColor: 'aqua',
        trackAllPureComponents: true,
        logOnDifferentValues: false,
    });
}

import { AppProps, NextWebVitalsMetric } from 'next/app';
import '../styles/global.scss';
import { CustomCursorProvider } from '../components/primitives/CustomCursor/CustomCursorProvider';
import { reportLogging } from '@symbio/headless/utils/metricsReport';

export function reportWebVitals(metrics: NextWebVitalsMetric): void {
    reportLogging(metrics);
}

function MyApp({ Component, pageProps }: AppProps): ReactElement {
    return (
        <CustomCursorProvider>
            <Component {...pageProps} />
        </CustomCursorProvider>
    );
}

export default MyApp;
