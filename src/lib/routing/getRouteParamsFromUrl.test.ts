import { getRouteParamsFromUrl } from './getRouteParamsFromUrl';

test('getRouteParamsFromUrl generates valid output', () => {
    expect(getRouteParamsFromUrl('/en/this/is/some/long/url')).toEqual({
        pathname: '/[...slug]',
        query: {
            locale: 'en',
            slug: ['this', 'is', 'some', 'long', 'url'],
        },
    });
});
