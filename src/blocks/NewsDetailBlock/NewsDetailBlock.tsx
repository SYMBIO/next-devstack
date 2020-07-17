import { ParsedUrlQuery } from 'querystring';
import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, NewsDetail } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import ProviderRegistry from '../../lib/provider/ProviderRegistry';
import NewsProvider from '../../providers/NewsProvider';
import { newsDetailQueryResponse } from '../../relay/__generated__/newsDetailQuery.graphql';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import getId from '../../utils/getId';
import styles from './NewsDetailBlock.module.scss';

type ServerProps = newsDetailQueryResponse;

type NewsDetailBlockProps = BaseBlockProps & ServerProps;

graphql`
    fragment NewsDetailBlock_content on NewsDetailBlockRecord {
        id
    }
`;

function NewsDetailBlock({ item }: NewsDetailBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'NewsDetailBlock'} className={styles.wrapper}>
            {item && item.content && (
                <NewsDetail
                    news={{
                        ...item,
                        id: item.id,
                        dateFrom: String(item.dateFrom),
                        title: String(item.title),
                        slug: String(item.slug),
                        content: item.content as never,
                    }}
                />
            )}
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    NewsDetailBlock.getStaticPaths = async (locale: string): Promise<ParsedUrlQuery[]> => {
        const provider = ProviderRegistry.get('news') as NewsProvider;
        return provider.getStaticPaths(locale);
    };

    NewsDetailBlock.getStaticProps = NewsDetailBlock.getServerSideProps = async ({
        locale,
        params,
    }: StaticBlockContext): Promise<ServerProps> => {
        if (!params || !params.slug) {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }

        const slug = params.slug;
        const id = getId(slug);

        if (!id) {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }

        const provider = ProviderRegistry.get('news') as NewsProvider;
        const item = (await provider.findOne(id, locale)) as newsDetailQueryResponse['item'];

        return {
            item,
        };
    };
}

BlockRegistry.set('NewsDetailBlock', NewsDetailBlock);
