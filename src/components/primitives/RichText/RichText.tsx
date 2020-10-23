import React, { Fragment, ReactElement } from 'react';
import parse from 'html-react-parser';
import { DomElement, domToReact, HTMLReactParserOptions } from 'html-react-parser';
import { BsPrefixAndClassNameOnlyProps } from 'react-bootstrap/helpers';
import { v4 } from 'uuid';
import { isInternalLink } from '../../../lib/routing/isInternalLink';
import nbsp from '../../../utils/nbsp';
import { List } from '../List/List';
import { Link } from '../Link/Link';
import { Heading } from '../Heading/Heading';
import { Table } from '../Table/Table';
import { Paragraph } from '../Paragraph/Paragraph';
import { Blockquote } from '../Blockquote/Blockquote';

export interface RichTextProps extends BsPrefixAndClassNameOnlyProps {
    content: string;
}

const RichText = ({ content, className, bsPrefix }: RichTextProps): ReactElement<RichTextProps, 'div'> | null => {
    const parserOptions = new (class implements HTMLReactParserOptions {
        public replace(domNode: DomElement): React.ReactElement | Record<string, unknown> | false | undefined {
            if (domNode.type === 'tag') {
                switch (domNode.name) {
                    case 'a': {
                        const linkParams = domNode.attribs;
                        if (linkParams && domNode.children) {
                            delete linkParams.style;
                            if (isInternalLink(linkParams.href)) {
                                return (
                                    <Link {...linkParams} key={v4()}>
                                        {domNode.children ? <>{domToReact(domNode.children, parserOptions)}</> : <></>}
                                    </Link>
                                );
                            } else {
                                return (
                                    <Link key={v4()} {...linkParams}>
                                        {domToReact(domNode.children, parserOptions)}
                                    </Link>
                                );
                            }
                        } else {
                            return <Fragment key={v4()} />;
                        }
                    }

                    case 'h1':
                    case 'h2':
                    case 'h3':
                    case 'h4':
                    case 'h5':
                    case 'h6':
                        if (domNode.children) {
                            return (
                                <Heading key={v4()} tag={domNode.name}>
                                    {domToReact(domNode.children, parserOptions)}
                                </Heading>
                            );
                        } else {
                            return <Fragment key={v4()} />;
                        }

                    case 'table':
                        if (domNode.children) {
                            return <Table key={v4()}>{domToReact(domNode.children, parserOptions)}</Table>;
                        } else {
                            return <Fragment key={v4()} />;
                        }

                    case 'p':
                        if (domNode.children && domNode.children.length > 0) {
                            return <Paragraph key={v4()}>{domToReact(domNode.children, parserOptions)}</Paragraph>;
                        } else {
                            return <Fragment key={v4()} />;
                        }

                    case 'ul':
                        if (domNode.children && domNode.children.length > 0) {
                            return (
                                <List key={v4()} tag="ul">
                                    {domToReact(domNode.children, parserOptions)}
                                </List>
                            );
                        } else {
                            return <Fragment key={v4()} />;
                        }

                    case 'ol':
                        if (domNode.children && domNode.children.length > 0) {
                            return (
                                <List key={v4()} tag="ol">
                                    {domToReact(domNode.children, parserOptions)}
                                </List>
                            );
                        } else {
                            return <Fragment key={v4()} />;
                        }

                    case 'blockquote':
                        if (domNode.children && domNode.children.length > 0) {
                            return <Blockquote key={v4()}>{domToReact(domNode.children, parserOptions)}</Blockquote>;
                        } else {
                            return <Fragment key={v4()} />;
                        }

                    case 'iframe': {
                        const attribs = domNode.attribs;
                        if (attribs) {
                            delete attribs.width;
                            delete attribs.height;
                        }
                        return <iframe {...attribs} />;
                    }

                    case 'img': {
                        const attribs = domNode.attribs;
                        if (attribs) {
                            const src = attribs.src;
                            const alt = attribs.alt;
                            delete attribs.src;
                            delete attribs.alt;
                            return (
                                <span key={v4()} style={{ padding: '16px', display: 'inline-block' }}>
                                    <img src={src} alt={alt} {...attribs} />
                                </span>
                            );
                        }
                        break;
                    }

                    case 'b': {
                        return <strong key={v4()}>{domToReact(domNode.children || [], parserOptions)}</strong>;
                    }

                    case 'i': {
                        return <em key={v4()}>{domToReact(domNode.children || [], parserOptions)}</em>;
                    }
                }
            }

            if (domNode.type === 'text') {
                return <>{nbsp(domNode.data)}</>;
            }

            return;
        }
    })();

    return <>{parse(content, parserOptions)}</>;
};

RichText.whyDidYouRender = true;

export { RichText };
