import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Error404 } from '../../components/blocks/Error404/Error404';
import { BaseBlockProps } from '../../types/block';
import { Error404Block_content } from './__generated__/Error404Block_content.graphql';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StaticProps {}

type Error404BlockProps = StaticProps & {
    content: Error404Block_content;
    className?: string;
};

graphql`
    fragment Error404Block_content on Error404BlockRecord {
        id
        description
        headline
    }
`;

function Error404Block({ content, className, ...rest }: Error404BlockProps): ReactElement {
    return (
        <BlockWrapper tooltip={'Error404Block'} className={className} {...rest}>
            <Error404 headline={content.headline} description={content.description} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    // put your getStaticProps or getStaticPaths
    /*
    Error404Block.getStaticProps = async ({
        locale,
        providers,
    }: StaticBlockContext): Promise<StaticProps> => {
        const provider = providers.x;

        return {};
    };
    */
}

Error404Block.whyDidYouRender = true;

export default Error404Block;
