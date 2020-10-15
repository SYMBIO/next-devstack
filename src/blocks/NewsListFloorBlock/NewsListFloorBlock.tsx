import React, { ReactElement } from 'react';
import { graphql } from 'relay-runtime';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { FindResponse } from '../../lib/provider/Provider';
import { newsDetailQueryResponse } from '../../relay/__generated__/newsDetailQuery.graphql';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import styles from './NewsListFloorBlock.module.scss';
import { NewsList } from '../../components/blocks/NewsList/NewsList';

type StaticProps = FindResponse<NonNullable<newsDetailQueryResponse['item']>>;

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

function NewsListFloorBlock({
    content,
    data,
    ...rest
}: NewsListFloorBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { heading, allNewsLinkText, allNewsPage } = content;

    return (
        <BlockWrapper tooltip={'NewsListFloorBlock'} className={styles.wrapper} {...rest}>
            <NewsList headline={heading} items={data} allNewsPage={allNewsPage} allNewsLinkText={allNewsLinkText} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    NewsListFloorBlock.getStaticProps = async ({ locale, providers }: StaticBlockContext): Promise<StaticProps> =>
        await providers.news.find({
            locale,
            limit: 3,
            offset: 0,
        });
}

NewsListFloorBlock.whyDidYouRender = true;

BlockRegistry.set('NewsListFloorBlock', NewsListFloorBlock);
