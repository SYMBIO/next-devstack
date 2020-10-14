import React, { ReactElement, useState } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, Heading, SubpageList } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import styles from './SubpageListBlock.module.scss';
import { SubpageListBlock_content } from './__generated__/SubpageListBlock_content.graphql';
import PageProvider from '../../providers/PageProvider';
import { ImageInterface } from '../../types/app';
import condCls from '../../utils/conditionalClasses';

interface ServerProps {
    count: number;
    items: {
        __typename: 'PageRecord';
        id: string;
        title: string;
        url: string;
        image: ImageInterface;
    }[];
}

type SubpageListBlockProps = BaseBlockProps &
    ServerProps & {
        content: SubpageListBlock_content;
        className?: string;
    };

graphql`
    fragment SubpageListBlock_content on SubpageListBlockRecord {
        id
        page {
            __typename
            id
            ... on PageRecord {
                url
                title
            }
        }
        sortAlphabetically
        heading
    }
`;

function SubpageListBlock({
    content,
    items,
    count,
    className,
    ...rest
}: SubpageListBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const [page, setPage] = useState(1);

    return (
        <BlockWrapper
            marginTop={'xl'}
            tooltip={'SubpageListBlock'}
            className={condCls(styles.wrapper, className)}
            {...rest}
        >
            {content.heading && <Heading tag={'h2'}>{content.heading}</Heading>}
            <SubpageList
                items={items}
                page={page}
                setPage={setPage}
                count={count}
                pages={!!content.pages}
                showImages={content.showImages}
            />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    SubpageListBlock.getStaticProps = SubpageListBlock.getServerSideProps = async ({
        locale,
        page,
        block,
        providers,
    }: StaticBlockContext): Promise<ServerProps> => {
        const parentId: string = block.page?.id || page?.id;

        if (page?.id) {
            const provider = providers.page;

            const result = await provider.find({
                filter: {
                    parent: {
                        eq: parentId,
                    },
                },
                limit: 96,
                locale,
            });

            return {
                count: result.count,
                items: result.data.map((i) => ({
                    __typename: 'PageRecord',
                    id: i.id,
                    title: i.title,
                    url: i.url,
                    image: i.image,
                })),
            };
        } else {
            return {
                count: 0,
                items: [],
            };
        }
    };
}

SubpageListBlock.whyDidYouRender = true;

BlockRegistry.set('SubpageListBlock', SubpageListBlock);
