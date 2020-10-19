import React, { ReactElement } from 'react';

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    import('@welldone-software/why-did-you-render').then((wdyr) =>
        wdyr.default(React, {
            titleColor: 'green',
            diffNameColor: 'aqua',
            trackAllPureComponents: true,
        }),
    );
}

import { AppProps, NextWebVitalsMetric } from 'next/app';
import '../styles/global.scss';
import { reportLogging } from '../utils/metricsReport';

export function reportWebVitals(metrics: NextWebVitalsMetric): void {
    reportLogging(metrics);
}

function MyApp({ Component, pageProps }: AppProps): ReactElement {
    return <Component {...pageProps} />;
}

export default MyApp;
