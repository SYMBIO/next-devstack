import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { FindResponse } from '../../lib/provider/AbstractDatoCMSProvider';
import { newsListQueryResponse } from '../../relay/__generated__/newsListQuery.graphql';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import styles from './NewsListBlock.module.scss';
import { NewsList } from '../../components/blocks/NewsList/NewsList';

type StaticProps = FindResponse<newsListQueryResponse['items']>;

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

export default NewsListBlock;
