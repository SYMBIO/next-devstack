import React, { ReactElement, useContext } from 'react';
import dayjs from 'dayjs';
import Calendar from 'dayjs/plugin/calendar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { newsListQueryResponse } from '../../../relay/__generated__/newsListQuery.graphql';
import { Page } from '../../../types/app';
import { AppContext } from '../../../contexts/app-context/AppContext';
import { CardImg } from '../../primitives/CardImg/CardImg';
import { Heading } from '../../primitives/Heading/Heading';
import { Link } from '../../primitives/Link/Link';
import { RichText } from '../../primitives/RichText/RichText';

interface NewsListProps {
    headline?: string;
    items: newsListQueryResponse['items'];
    allNewsLinkText?: string;
    allNewsPage?: Page;
}

const NewsList = ({
    headline,
    allNewsLinkText,
    allNewsPage,
    items,
}: NewsListProps): ReactElement<NewsListProps, 'div'> | null => {
    const { newsPage } = useContext(AppContext);
    dayjs.extend(Calendar);

    return (
        <>
            {headline && (
                <Row>
                    <Col>
                        <Heading tag={'h2'}>{headline}</Heading>
                    </Col>
                </Row>
            )}

            {Array.isArray(items) && (
                <Row>
                    {items.map(
                        (item) =>
                            item.slug &&
                            newsPage && (
                                <Col key={`NewsList_item_${item.id}`}>
                                    <Card>
                                        <Link page={newsPage} plain params={{ slug: item.id + '-' + item.slug }}>
                                            {item.image?.responsiveImage && (
                                                <CardImg variant="top" data={item.image.responsiveImage} />
                                            )}
                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    {dayjs(item.dateFrom).calendar()}
                                                </Card.Subtitle>
                                                {item.perex && (
                                                    <Card.Text>
                                                        <RichText content={item.perex} />
                                                    </Card.Text>
                                                )}
                                            </Card.Body>
                                        </Link>
                                    </Card>
                                </Col>
                            ),
                    )}
                </Row>
            )}

            {allNewsLinkText && allNewsPage && <Link page={allNewsPage}>{allNewsLinkText}</Link>}
        </>
    );
};

NewsList.whyDidYouRender = true;

export { NewsList };
