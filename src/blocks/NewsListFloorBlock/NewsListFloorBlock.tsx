import React, { ReactElement } from 'react';
import { graphql } from 'relay-runtime';
import { BlockWrapper, NewsList } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { FindResponse } from '../../lib/provider/Provider';
import NewsProvider from '../../providers/NewsProvider';
import { newsDetailQueryResponse } from '../../relay/__generated__/newsDetailQuery.graphql';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import styles from './NewsListFloorBlock.module.scss';

interface ServerProps extends FindResponse {
    data: ReadonlyArray<NonNullable<newsDetailQueryResponse['item']>>;
}

type NewsListFloorBlockProps = BaseBlockProps & ServerProps;

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
    NewsListFloorBlock.getStaticProps = NewsListFloorBlock.getServerSideProps = async ({
        locale,
        providers,
    }: StaticBlockContext): Promise<ServerProps> => {
        const provider = providers.news;
        return await provider.find({
            locale,
            limit: 3,
            offset: 0,
        });
    };
}

NewsListFloorBlock.whyDidYouRender = true;

BlockRegistry.set('NewsListFloorBlock', NewsListFloorBlock);
