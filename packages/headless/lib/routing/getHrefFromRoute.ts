import { BasePage, Route } from '@symbio/cms';
import { getLinkParamsFromPage } from './getLinkParamsFromPage';
import AppStore from '../store/AppStore';

/**
 * Get href from Route object
 * @param route
 */
export function getHrefFromRoute(route: Route<any>): string {
    const app = AppStore.getInstance().get();

    if (route.url) {
        // custom URL
        return route.url;
    }
    if (route.file) {
        // link to file
        return route.file.url;
    }
    if (route.object) {
        const params = route.parameters
            ? JSON.parse(
                  '{"' + route.parameters.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                  function (key, value) {
                      return key === '' ? value : decodeURIComponent(value);
                  },
              )
            : {};

        // link to CMS objects with url (Page)
        if (Object.prototype.hasOwnProperty.call(route.object, 'url')) {
            return getLinkParamsFromPage(route.object as BasePage, params).as;
        }

        // link to CMS objects with slug (News, PressRelease, ...)
        const tmp = route.object.__typename.replace(/Record$/, '');
        const pageKey = tmp.charAt(0).toLowerCase() + tmp.slice(1) + 'Page';
        if (Object.prototype.hasOwnProperty.call(app, pageKey)) {
            if (
                Object.prototype.hasOwnProperty.call(route.object, 'slug') &&
                (route.object as { slug?: string | null }).slug
            ) {
                return getLinkParamsFromPage((app as never)[pageKey] as BasePage, {
                    ...params,
                    slug: (route.object as { slug: string }).slug,
                }).as;
            }
        }

        throw new Error('Link to ' + route.object.__typename + ' not defined');
    }

    return '';
}
