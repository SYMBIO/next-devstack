import { graphql } from 'relay-runtime';

export const formQuery = graphql`
    query saveFormQuery($locale: SiteLocale, $filter: FormModelFilter) {
        form(locale: $locale, filter: $filter) {
            id
            title
            emails
            sendToRecipient
            recipientText
            content {
                __typename
                ... on SingleLineInputRecord {
                    id
                    label
                }
                ... on TextareaRecord {
                    id
                    label
                }
                ... on CheckboxRecord {
                    id
                    label
                }
                ... on ChoiceRecord {
                    id
                    label
                }
                ... on FieldsetRecord {
                    legend
                }
            }
        }
    }
`;
