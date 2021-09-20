import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@storybook/addon-console';
import 'tailwindcss/tailwind.css';
import '../src/styles/global.scss';
import '!style-loader!css-loader!./custom.css';
import { RouterContext } from 'next/dist/shared/lib/router-context';
// @ts-ignore
import theme from './theme';
import dayjs from 'dayjs';
import 'dayjs/locale/cs';
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import calendar from 'dayjs/plugin/calendar';
import { CALENDAR_FORMATS } from '../src/constants';
import AppStore from '@symbio/headless/dist/lib/store/AppStore';
import { PageProps } from '../src/types/page';
import { WebSettingsProps } from '../src/types/webSettings';

dayjs.extend(updateLocale);
dayjs.extend(timeZone);
dayjs.extend(localizedFormat);
dayjs.extend(calendar);
dayjs.updateLocale('cs', { calendar: CALENDAR_FORMATS['cs'] });
dayjs.locale('cs');

AppStore.getInstance<PageProps, WebSettingsProps>({
    currentUrl: '/',
    page: {
        id: '14320773',
        url: 'homepage',
        _allUrlLocales: [
            { locale: 'cs', value: 'homepage' },
            { locale: 'en', value: 'homepage' },
        ],
        title: 'Homepage',
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
    webSetting: {
        logo: null,
        mainMenu: {
            links: [],
        },
        homepage: { title: 'Homepage', url: 'homepage' },
        newsPage: { title: 'Detail aktuality', url: 'aktualne/:slug' },
        footerMenu: { links: [] },
    },
    redirect: null,
});

export const parameters = {
    nextRouter: {
        Provider: RouterContext.Provider,
    },
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
        theme,
    },
};
