import { graphql } from 'relay-runtime';

export const exportFormQuery = graphql`
    query TokenExportFormQuery($filter: DataFormModelFilter) {
        allDataForms(filter: $filter) {
            id
            createdAt
            locale
            data
        }
    }
`;
