import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { BaseBlockProps } from '../../types/block';
import { {NAME}_content } from './__generated__/{NAME}_content.graphql';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StaticProps {}

type {NAME}Props = StaticProps & {
    content: {NAME}_content;
    className?: string
};

graphql`
    fragment {NAME}_content on {NAME}Record {
        id
{FIELDS}
    }
`;

function {NAME}({ content, className, ...rest }: {NAME}Props): ReactElement {
    return (
        <BlockWrapper tooltip={'{NAME}'} className={className} {...rest}>
            <div>{NAME}: {JSON.stringify(content)}</div>
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    // put your getStaticProps or getStaticPaths here
    /*
    {NAME}.getStaticProps = async ({
        locale,
        providers,
    }: StaticBlockContext): Promise<StaticProps> => {
        const provider = providers.x;

        return {};
    };
    */
}

{NAME}.whyDidYouRender = true;

export default {NAME};
