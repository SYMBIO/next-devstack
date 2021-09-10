import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@storybook/addon-console';
import { addDecorator } from '@storybook/react';
import { withNextRouter } from 'storybook-addon-next-router';
import '!style-loader!css-loader!sass-loader!../src/styles/global.scss';
import '!style-loader!css-loader!./custom.css';
// @ts-ignore
import ppfTheme from './ppfTheme';
import dayjs from 'dayjs';
import 'dayjs/locale/cs';
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import calendar from 'dayjs/plugin/calendar';
import { CALENDAR_FORMATS } from '../src/constants';
import AppStore from '../src/lib/store/AppStore';

dayjs.extend(updateLocale);
dayjs.extend(timeZone);
dayjs.extend(localizedFormat);
dayjs.extend(calendar);
dayjs.updateLocale('cs', { calendar: CALENDAR_FORMATS['cs'] });
dayjs.locale('cs');

AppStore.getInstance({
    currentUrl: '/',
    page: {
        id: '14320773',
        url: 'homepage',
        _allUrlLocales: [
            { locale: 'cs', value: 'homepage' },
            { locale: 'en', value: 'homepage' },
        ],
        title: 'Homepage',
        isLight: false,
        _status: 'published',
        _seoMetaTags: [],
        metaTags: null,
        parent: null,
        content: [],
    },
    site: {
        globalSeo: {
            siteName: 'PPF Group',
            titleSuffix: ' - PPF Group',
            facebookPageUrl: 'https://www.facebook.com/SkupinaPPF/',
            fallbackSeo: {
                description:
                    'Za úspěchem, profesionalitou a cílevědomostí skupiny PPF je téměř třicetiletá práce Petra Kellnera a týmu jeho spolupracovníků.',
                title: 'PPF Group',
                image: { url: 'https://www.datocms-assets.com/40359/1609949272-ppf-gate-web.jpg' },
                twitterCard: 'summary_large_image',
            },
            twitterAccount: '@SkupinaPPF',
        },
        favicon: null,
        faviconMetaTags: [],
    },
    mainMenu: {
        links: [],
    },
    rightMenu: {
        links: [],
    },
    homepage: { title: 'Homepage', url: 'homepage' },
    newsPage: { title: 'Detail aktuality', url: 'aktualne/:slug' },
    pressReleasePage: { title: 'Detail tiskové zprávy', url: 'pro-media/:slug' },
    insightsPage: { title: 'Insights', url: 'insights' },
    insightCategoryPage: { title: 'Kategorie insightů', url: 'insight/:slug' },
    footerMenu: { links: [] },
});

addDecorator(
    withNextRouter({
        path: '/', // defaults to `/`
        asPath: '/', // defaults to `/`
        query: {}, // defaults to `{}`
        push() {} // defaults to using addon actions integration, can override any method in the router
    })
);

export const parameters = {
    viewport: {
        viewports: INITIAL_VIEWPORTS,
        initialViewport: 'iphone6',
    },
    options: {
        storySort: {
            order: ['Blocks', 'Organisms', 'Molecules', 'Primitives'],
        },
    },
    backgrounds: {
        default: 'blue',
        values: [
            {
                name: 'white',
                value: '#ffffff',
            },
            {
                name: 'beige',
                value: '#F7F3EB',
            },
            {
                name: 'blue',
                value: '#002c5a',
            },
        ],
    },
    docs: {
        theme: ppfTheme,
    },
};
