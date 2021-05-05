import AbstractDatoCMSProvider from '../../lib/provider/AbstractDatoCMSProvider';
import { redirectDetailQueryResponse } from '../../relay/__generated__/redirectDetailQuery.graphql';
import { redirectListQueryResponse } from '../../relay/__generated__/redirectListQuery.graphql';
import * as d from '../../relay/__generated__/redirectDetailQuery.graphql';
import * as l from '../../relay/__generated__/redirectListQuery.graphql';

export default class RedirectProvider extends AbstractDatoCMSProvider<
    d.redirectDetailQuery,
    l.redirectListQuery,
    redirectDetailQueryResponse['item'],
    redirectListQueryResponse['items']
> {
    getApiKey(): string {
        return 'redirect';
    }

    getId(): string {
        return '184269';
    }
}
