import NewsProvider from './datocms/NewsProvider';
import NewsCategoryProvider from './datocms/NewsCategoryProvider';
import PageProvider from './datocms/PageProvider';
import RedirectProvider from './datocms/RedirectProvider';

export default {
    news: NewsProvider,
    newsCategory: NewsCategoryProvider,
    page: PageProvider,
    redirect: RedirectProvider,
};
