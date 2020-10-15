import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, NewsList } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { FindResponse } from '../../lib/provider/Provider';
import { newsDetailQueryResponse } from '../../relay/__generated__/newsDetailQuery.graphql';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import styles from './NewsListBlock.module.scss';

type StaticProps = FindResponse<NonNullable<newsDetailQueryResponse['item']>>;

type NewsListBlockProps = BaseBlockProps & StaticProps;

graphql`
    fragment NewsListBlock_content on NewsListBlockRecord {
        id
    }
`;

function NewsListBlock({ data, ...rest }: NewsListBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'NewsListBlock'} className={styles.wrapper} {...rest}>
            <NewsList items={data} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    NewsListBlock.getStaticProps = async ({ locale, providers }: StaticBlockContext): Promise<StaticProps> =>
        await providers.news.find({
            locale,
            limit: 10,
            offset: 0,
        });
}

NewsListBlock.whyDidYouRender = true;

BlockRegistry.set('NewsListBlock', NewsListBlock);
