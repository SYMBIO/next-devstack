import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';

const Page = (): ReactElement => {
    return <span>404</span>;
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            code: 404,
        },
    };
};

export default Page;
