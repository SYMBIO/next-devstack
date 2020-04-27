import { ParsedUrlQuery } from 'querystring';
import React, { ReactElement } from 'react';
import { Environment, fetchQuery, graphql } from 'react-relay';
import { BlockWrapper, NewsDetail } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { SiteLocale } from '../../types/graphql';
import getId from '../../utils/getId';
import { NewsDetailBlockQuery, NewsDetailBlockQueryResponse } from './__generated__/NewsDetailBlockQuery.graphql';
import { NewsDetailBlockStaticPathsQuery } from './__generated__/NewsDetailBlockStaticPathsQuery.graphql';
import styles from './NewsDetailBlock.module.scss';

type NewsDetailBlockProps = BaseBlockProps & NewsDetailBlockQueryResponse;

graphql`
    fragment NewsDetailBlock_content on NewsDetailRecord {
        id
    }
`;

const query = graphql`
    query NewsDetailBlockQuery($locale: SiteLocale, $id: ItemId!) {
        news(locale: $locale, filter: { id: { eq: $id } }) {
            id
            dateFrom
            title
            slug
            perex
            content {
                __typename
                ...RichTextBlock_content @relay(mask: false)
                ...GalleryBlock_content @relay(mask: false)
                ...ImageBlock_content @relay(mask: false)
                ...VideoBlock_content @relay(mask: false)
                ...YoutubeVimeoBlock_content @relay(mask: false)
            }
            image {
                ...appImageFragment @relay(mask: false)
            }
            tags {
                id
                title
            }
        }
    }
`;

const staticPathsQuery = graphql`
    query NewsDetailBlockStaticPathsQuery($locale: SiteLocale) {
        allNews(locale: $locale, orderBy: [dateFrom_DESC]) {
            id
            slug
            category {
                id
                slug
            }
        }
    }
`;

function NewsDetailBlock({ content, news, ...rest }: NewsDetailBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'NewsDetailBlock'} className={styles.wrapper} {...rest}>
            {news && news.content && (
                <NewsDetail
                    news={{
                        ...news,
                        id: String(news.id),
                        dateFrom: String(news.dateFrom),
                        title: String(news.title),
                        slug: String(news.slug),
                        content: news.content as any,
                    }}
                />
            )}
        </BlockWrapper>
    );
}

NewsDetailBlock.getStaticPaths = async (locale: SiteLocale, environment: Environment): Promise<ParsedUrlQuery[]> => {
    const params: ParsedUrlQuery[] = [];

    const data = await fetchQuery<NewsDetailBlockStaticPathsQuery>(environment, staticPathsQuery, {
        locale,
    });

    for (const news of data.allNews) {
        params.push({
            slug: news.id + '-' + news.slug,
        });
    }

    return params;
};

NewsDetailBlock.getStaticProps = NewsDetailBlock.getServerSideProps = async ({
    environment,
    locale,
    params,
}: StaticBlockContext): Promise<NewsDetailBlockQueryResponse | {}> => {
    if (!params) {
        return {};
    }

    const slug = params.slug;
    const id = getId(slug);

    if (!id) {
        return {};
    }

    return fetchQuery<NewsDetailBlockQuery>(environment, query, {
        locale,
        id,
    });
};

BlockFactory.set('NewsDetailBlock', NewsDetailBlock);
