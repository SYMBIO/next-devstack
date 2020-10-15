import NewsProvider from '../providers/datocms/NewsProvider';
import NewsCategoryProvider from '../providers/datocms/NewsCategoryProvider';
import PageProvider from '../providers/datocms/PageProvider';

export type Providers = {
    news: typeof NewsProvider;
    newsCategory: typeof NewsCategoryProvider;
    page: typeof PageProvider;
};
