import React, { ReactElement, useContext } from 'react';
import { fetchQuery, graphql } from 'react-relay';
import { useFragment, useLazyLoadQuery } from 'relay-hooks/lib';
import { BlockWrapper } from '../components';
import { NewsList } from '../components';
import BlockFactory from '../lib/blocks/BlockFactory';
import { createRelayEnvironment } from '../lib/relay/createRelayEnvironment';
import { BaseBlockProps, BlockContext } from '../types/block';
import { NewsListBlockQuery, NewsListBlockQueryResponse } from './__generated__/NewsListBlockQuery.graphql';
import styles from './NewsListBlock.module.scss';

type NewsListBlockProps = BaseBlockProps & NewsListBlockQueryResponse;

const query = graphql`
    query NewsListBlockQuery($locale: SiteLocale, $limit: IntType, $offset: IntType) {
        allNews(locale: $locale, orderBy: dateFrom_DESC, first: $limit, skip: $offset) {
            id
            dateFrom
            title
            perex
            image {
                url
                alt
            }
            tags {
                id
                title
            }
        }
    }
`;

function NewsListBlock({ content, allNews, ...rest }: NewsListBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { headline } = useFragment(
        graphql`
            fragment NewsListBlock_content on NewsListRecord {
                headline
            }
        `,
        content,
    );

    return (
        <BlockWrapper className={styles.wrapper} {...rest}>
            <NewsList headline={headline} items={allNews} />
        </BlockWrapper>
    );
}

NewsListBlock.getInitialProps = async ({ environment, locale }: BlockContext) => {
    return fetchQuery<NewsListBlockQuery>(environment || createRelayEnvironment({}, false), query, {
        locale,
        limit: 3,
        offset: 0,
    });
};

BlockFactory.set('NewsListBlock', NewsListBlock);
