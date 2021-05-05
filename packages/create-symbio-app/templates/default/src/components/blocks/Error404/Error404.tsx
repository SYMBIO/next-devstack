import React, { ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Error404.module.scss';
import { Heading } from '../../primitives/Heading/Heading';
import { RichText } from '../../primitives/RichText/RichText';

interface Error404Props {
    className?: string;
    description: string | null;
    headline: string | null;
}

const Error404 = ({ className, headline, description }: Error404Props): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        {headline && <Heading tag={'h1'}>{headline}</Heading>}
        {description && <RichText content={description} />}
    </div>
);

Error404.whyDidYouRender = true;

export { Error404 };
