import React, { ReactElement } from 'react';
import { fetchQuery, graphql } from 'react-relay';
import { BlockWrapper, NewsList } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import {
    NewsListFloorBlockQuery,
    NewsListFloorBlockQueryResponse,
} from './__generated__/NewsListFloorBlockQuery.graphql';
import styles from './NewsListFloorBlock.module.scss';

type NewsListFloorBlockProps = BaseBlockProps & NewsListFloorBlockQueryResponse;

graphql`
    fragment NewsListFloorBlock_content on NewsListFloorRecord {
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

const query = graphql`
    query NewsListFloorBlockQuery($locale: SiteLocale, $limit: IntType, $offset: IntType) {
        allNews(locale: $locale, orderBy: dateFrom_DESC, first: $limit, skip: $offset) {
            id
            dateFrom
            title
            slug
            perex
            image {
                ...appImageFragment @relay(mask: false)
            }
            category {
                id
                slug
            }
            tags {
                id
                title
            }
        }
    }
`;

function NewsListFloorBlock({
    content,
    allNews,
    ...rest
}: NewsListFloorBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { heading, allNewsLinkText, allNewsPage } = content;

    return (
        <BlockWrapper tooltip={'NewsListFloorBlock'} className={styles.wrapper} {...rest}>
            <NewsList headline={heading} items={allNews} allNewsPage={allNewsPage} allNewsLinkText={allNewsLinkText} />
        </BlockWrapper>
    );
}

NewsListFloorBlock.getStaticProps = NewsListFloorBlock.getServerSideProps = async ({
    environment,
    locale,
}: StaticBlockContext): Promise<NewsListFloorBlockQueryResponse> => {
    return fetchQuery<NewsListFloorBlockQuery>(environment, query, {
        locale,
        limit: 3,
        offset: 0,
    });
};

BlockFactory.set('NewsListFloorBlock', NewsListFloorBlock);
