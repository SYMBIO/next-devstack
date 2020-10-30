import AbstractElasticProvider from '../../lib/provider/AbstractElasticProvider';
import { redirectDetailQueryResponse } from '../../relay/__generated__/redirectDetailQuery.graphql';
import { redirectListQueryResponse } from '../../relay/__generated__/redirectListQuery.graphql';
import { redirectDetailQuery, redirectListQuery } from '../../relay/redirect';
import * as d from '../../relay/__generated__/redirectDetailQuery.graphql';
import * as l from '../../relay/__generated__/redirectListQuery.graphql';

class RedirectProvider extends AbstractElasticProvider<
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

    isLocalizable(): boolean {
        return false;
    }
}

export default new RedirectProvider(redirectDetailQuery, redirectListQuery);
