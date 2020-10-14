import NewsProvider from '../providers/NewsProvider';
import NewsCategoryProvider from '../providers/NewsCategoryProvider';
import PageProvider from '../providers/PageProvider';

export type Providers = {
    news: typeof NewsProvider;
    newsCategory: typeof NewsCategoryProvider;
    page: typeof PageProvider;
};
