import { ParsedUrlQuery } from 'querystring';
import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { newsDetailQueryResponse } from '../../relay/__generated__/newsDetailQuery.graphql';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import getId from '../../utils/getId';
import styles from './NewsDetailBlock.module.scss';
import { Providers } from '../../types/provider';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { NewsDetail } from '../../components/blocks/NewsDetail/NewsDetail';

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
    NewsDetailBlock.getStaticPaths = async (locale: string, providers: Providers): Promise<ParsedUrlQuery[]> => {
        const provider = providers.news;
        return provider.getStaticPaths(locale);
    };

    NewsDetailBlock.getStaticProps = NewsDetailBlock.getServerSideProps = async ({
        locale,
        params,
        providers,
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

        const provider = providers.news;
        const item = (await provider.findOne(id, locale)) as newsDetailQueryResponse['item'];

        return {
            item,
        };
    };
}

NewsDetailBlock.whyDidYouRender = true;

export default NewsDetailBlock;
