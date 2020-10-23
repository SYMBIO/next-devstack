import React, { ReactElement } from 'react';
import { graphql } from 'relay-runtime';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { FindResponse } from '../../lib/provider/AbstractDatoCMSProvider';
import { newsListQueryResponse } from '../../relay/__generated__/newsListQuery.graphql';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { NewsList } from '../../components/blocks/NewsList/NewsList';

type StaticProps = FindResponse<newsListQueryResponse['items']>;

type NewsListFloorBlockProps = BaseBlockProps & StaticProps;

graphql`
    fragment NewsListFloorBlock_content on NewsListFloorBlockRecord {
        id
        allNewsPage {
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

function NewsListFloorBlock({ content, data }: NewsListFloorBlockProps): ReactElement {
    const { heading, allNewsLinkText, allNewsPage } = content;

    return (
        <BlockWrapper tooltip={'NewsListFloorBlock'}>
            <NewsList headline={heading} items={data} allNewsPage={allNewsPage} allNewsLinkText={allNewsLinkText} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    NewsListFloorBlock.getStaticProps = async ({
        locale,
        providers,
        block,
    }: StaticBlockContext): Promise<StaticProps> =>
        await providers.news.find({
            locale,
            limit: block.count || 3,
            offset: 0,
        });
}

NewsListFloorBlock.whyDidYouRender = true;

export default NewsListFloorBlock;
