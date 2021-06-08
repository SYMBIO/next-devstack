import AbstractDatoCMSProvider from '../lib/AbstractDatoCMSProvider';
import { redirectDetailQueryResponse } from '../../headless/relay/__generated__/redirectDetailQuery.graphql';
import { redirectListQueryResponse } from '../../headless/relay/__generated__/redirectListQuery.graphql';
import * as d from '../../headless/relay/__generated__/redirectDetailQuery.graphql';
import * as l from '../../headless/relay/__generated__/redirectListQuery.graphql';

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
