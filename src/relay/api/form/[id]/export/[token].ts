import { graphql } from 'relay-runtime';

export const exportFormQuery = graphql`
    query TokenExportFormQuery($filter: FormDataModelFilter) {
        allFormDataS(filter: $filter) {
            id
            createdAt
            locale
            data
        }
    }
`;
