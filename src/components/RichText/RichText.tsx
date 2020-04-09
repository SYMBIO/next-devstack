import React, { ReactElement } from 'react';
import parse from 'html-react-parser';
import { parserOptions } from '../../utils/html-parser/parserOptions';

export interface RichTextProps {
    content: string;
}

export const RichText = ({ content }: RichTextProps): ReactElement<RichTextProps, 'div'> | null => {
    return <>{parse(content, parserOptions)}</>;
};
