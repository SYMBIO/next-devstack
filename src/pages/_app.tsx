import React from 'react';
import isStaging from '../utils/isStaging';

if (isStaging() && typeof window !== 'undefined') {
    import('@welldone-software/why-did-you-render').then((wdyr) =>
        wdyr.default(React, {
            titleColor: 'green',
            diffNameColor: 'aqua',
            trackAllPureComponents: true,
        }),
    );
}

import { AppProps } from 'next/app';
import '../styles/global.scss';

export function reportWebVitals(metric: any) {
    console.log(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
