import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { FindResponse } from '@symbio/cms-datocms';
import { newsListQueryResponse } from '../../relay/__generated__/newsListQuery.graphql';
import { StaticBlockContext } from '@symbio/headless/dist/types/block';
import { NewsList } from '../../components/blocks/NewsList/NewsList';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { NewsListFloorBlock_content } from './__generated__/NewsListFloorBlock_content.graphql';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';

type StaticProps = FindResponse<newsListQueryResponse['items'][number]>;

type NewsListFloorBlockProps = StaticProps & {
    content: NewsListFloorBlock_content;
};

graphql`
    fragment NewsListFloorBlock_content on NewsListFloorBlockRecord {
        id
        allNewsPage {
            id
            url
        }
        allNewsLinkText
        categories {
            id
        }
        count
        heading
    }
`;

function NewsListFloorBlock({
    content,
    data,
    ...rest
}: NewsListFloorBlockProps): ReactElement<NewsListFloorBlockProps, 'BaseBlock'> {
    const { heading, allNewsLinkText, allNewsPage } = content;

    return (
        <BlockWrapper tooltip={'NewsListFloorBlock'} {...rest}>
            <NewsList headline={heading} items={data} allNewsPage={allNewsPage} allNewsLinkText={allNewsLinkText} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    NewsListFloorBlock.getStaticProps = async ({
        locale,
        providers,
    }: StaticBlockContext<PageProps, WebSettingsProps, Providers, Locale>): Promise<StaticProps> =>
        await providers.news.find({
            locale,
            limit: 3,
            offset: 0,
        });
}

NewsListFloorBlock.whyDidYouRender = true;

export default NewsListFloorBlock;
