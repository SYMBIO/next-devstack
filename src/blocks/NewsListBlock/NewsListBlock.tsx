import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, NewsList } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { FindResponse } from '../../lib/provider/Provider';
import ProviderRegistry from '../../lib/provider/ProviderRegistry';
import NewsProvider from '../../providers/NewsProvider';
import { newsDetailQueryResponse } from '../../relay/__generated__/newsDetailQuery.graphql';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import styles from './NewsListBlock.module.scss';

interface ServerProps extends FindResponse {
    data: NonNullable<newsDetailQueryResponse['item']>[];
}

type NewsListBlockProps = BaseBlockProps & ServerProps;

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
    NewsListBlock.getStaticProps = NewsListBlock.getServerSideProps = async ({
        locale,
    }: StaticBlockContext): Promise<ServerProps> => {
        const provider = ProviderRegistry.get('news') as NewsProvider;
        return await provider.find({
            locale,
            limit: 10,
            offset: 0,
        });
    };
}

BlockRegistry.set('NewsListBlock', NewsListBlock);
