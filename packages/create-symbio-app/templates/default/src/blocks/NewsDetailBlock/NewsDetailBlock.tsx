import { GetStaticPathsResult } from 'next';
import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { newsDetailQueryResponse } from '../../relay/__generated__/newsDetailQuery.graphql';
import { StaticBlockContext } from '@symbio/headless/dist/types/block';
import getId from '@symbio/headless/dist/utils/getId';
import styles from './NewsDetailBlock.module.scss';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { NewsDetail } from '../../components/blocks/NewsDetail/NewsDetail';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import symbio from '../../../symbio.config.json';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';

type ServerProps = newsDetailQueryResponse;

type NewsDetailBlockProps = ServerProps;

graphql`
    fragment NewsDetailBlock_content on NewsDetailBlockRecord {
        id
    }
`;

function NewsDetailBlock({ item }: NewsDetailBlockProps): ReactElement<NewsDetailBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'NewsDetailBlock'} className={styles.wrapper}>
            {item && item.content && (
                <NewsDetail
                    news={{
                        ...item,
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
    NewsDetailBlock.getStaticPaths = async (
        locale: string | undefined,
        providers: Providers,
    ): Promise<GetStaticPathsResult['paths']> => {
        const provider = providers.news;
        return provider.getStaticPaths(locale || symbio.i18n.defaultLocale);
    };

    NewsDetailBlock.getStaticProps = async ({
        locale,
        context: { params },
        providers,
    }: StaticBlockContext<PageProps, WebSettingsProps, Providers, Locale>): Promise<ServerProps> => {
        if (!params || !params.slug) {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }

        const id = getId(params.slug);

        if (!id) {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }

        const item = (await providers.news.findOne({ id, locale })) as newsDetailQueryResponse['item'];

        return {
            item,
        };
    };
}

NewsDetailBlock.whyDidYouRender = true;

export default NewsDetailBlock;
