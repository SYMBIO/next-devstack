import AbstractElasticProvider from '../../lib/provider/AbstractElasticProvider';
import { redirectDetailQueryResponse } from '../../relay/__generated__/redirectDetailQuery.graphql';
import { redirectListQueryResponse } from '../../relay/__generated__/redirectListQuery.graphql';
import { redirectDetailQuery, redirectListQuery } from '../../relay/redirect';
import * as d from '../../relay/__generated__/redirectDetailQuery.graphql';
import * as l from '../../relay/__generated__/redirectListQuery.graphql';

export default class RedirectProvider extends AbstractElasticProvider<
    d.redirectDetailQuery,
    l.redirectListQuery,
    redirectDetailQueryResponse['item'],
    redirectListQueryResponse['items']
> {}
