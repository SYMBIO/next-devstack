import { graphql } from 'relay-runtime';

export const confirmSubscriberQuery = graphql`
    query confirmSubscriberQuery($filter: NewsletterSubscriberModelFilter) {
        newsletterSubscriber(filter: $filter) {
            id
            email
            locale
            confirmed
        }
    }
`;
