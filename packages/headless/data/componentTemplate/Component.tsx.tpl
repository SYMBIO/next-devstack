import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { BlockWrapper } from '../../base/BlockWrapper/BlockWrapper';
import {
    {NAME}BlockContent,
    {NAME}BlockProps,
} from '../../../blocks/{NAME}Block/{NAME}Block';
import { Heading } from '../../primitives/Heading/Heading';
import styles from './{NAME}.module.scss';

export type {NAME}Props = Omit<{NAME}BlockProps, 'content'> &
    Omit<{NAME}BlockContent, 'id' | '__typename'>;

export const {NAME} = ({ className, app, ...props }: {NAME}Props): ReactElement => (
    <BlockWrapper className={clsx(styles.blockWrapper, className)}>
        <Heading tag={'h2'} className="mt-6">
            {NAME}Block
        </Heading>
        <pre className="p-8 bg-gray-300 w-full">{JSON.stringify(props, undefined, '    ')}</pre>
    </BlockWrapper>
);
