import { NextWebVitalsMetric } from 'next/app';

const printCorrectColors = (good: number, medium: number, metric: string, value: number) => {
    if (value <= good) {
        console.log(
            `%c${metric}: ${Math.round(value * 100) / 100_000}s`,
            `color: green; font-weight: bold; font-size: 1rem`,
        );
    } else if (value <= medium) {
        console.log(
            `%c${metric}: ${Math.round(value * 100) / 100_000}s`,
            `color: orange; font-weight: bold; font-size: 1rem`,
        );
    } else {
        console.log(
            `%c${metric}: ${Math.round(value * 100) / 100_000}s`,
            `color: red; font-weight: bold; font-size: 1rem`,
        );
    }
};

export function reportLogging(metric: NextWebVitalsMetric) {
    switch (metric.name) {
        case 'FCP':
            printCorrectColors(2_000, 4_000, metric.name, metric.value);
            break;
        case 'LCP':
            printCorrectColors(2_500, 4_000, metric.name, metric.value);
            break;
        case 'TTI':
            printCorrectColors(3_800, 7_300, metric.name, metric.value);
            break;
        case 'CLS':
            printCorrectColors(100, 250, metric.name, metric.value);
            break;
        case 'FID':
            printCorrectColors(100, 300, metric.name, metric.value);
            break;
        case 'TTFB':
            printCorrectColors(500, 1000, metric.name, metric.value);
            break;
        case 'Next.js-hydration':
            printCorrectColors(10, 50, metric.name, metric.value);
            break;
        case 'Next.js-route-change-to-render':
            printCorrectColors(10, 50, metric.name, metric.value);
            break;
        case 'Next.js-render':
            printCorrectColors(10, 50, metric.name, metric.value);
            break;
        default:
            break;
    }
}
