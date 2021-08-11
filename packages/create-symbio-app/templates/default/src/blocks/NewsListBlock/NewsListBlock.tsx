import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { FindResponse } from '@symbio/cms-datocms';
import { newsListQueryResponse } from '../../relay/__generated__/newsListQuery.graphql';
import { StaticBlockContext } from '@symbio/headless/dist/types/block';
import styles from './NewsListBlock.module.scss';
import { NewsList } from '../../components/blocks/NewsList/NewsList';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';

type StaticProps = FindResponse<newsListQueryResponse['items'][number]>;

type NewsListBlockProps = StaticProps;

graphql`
    fragment NewsListBlock_content on NewsListBlockRecord {
        id
    }
`;

function NewsListBlock({ data, ...rest }: NewsListBlockProps): ReactElement<NewsListBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'NewsListBlock'} className={styles.wrapper} {...rest}>
            <NewsList items={data} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    NewsListBlock.getStaticProps = async ({
        locale,
        providers,
    }: StaticBlockContext<PageProps, WebSettingsProps, Providers, Locale>): Promise<StaticProps> =>
        await providers.news.find({
            locale,
            limit: 10,
            offset: 0,
        });
}

NewsListBlock.whyDidYouRender = true;

export default NewsListBlock;
