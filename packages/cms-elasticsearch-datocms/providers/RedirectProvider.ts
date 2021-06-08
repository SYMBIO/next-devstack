import AbstractElasticProvider from '../../cms/lib/AbstractElasticProvider';
import { redirectDetailQueryResponse } from '../../headless/relay/__generated__/redirectDetailQuery.graphql';
import { redirectListQueryResponse } from '../../headless/relay/__generated__/redirectListQuery.graphql';
import { redirectDetailQuery, redirectListQuery } from '../../headless/relay/redirect';
import * as d from '../../headless/relay/__generated__/redirectDetailQuery.graphql';
import * as l from '../../headless/relay/__generated__/redirectListQuery.graphql';

export default class RedirectProvider extends AbstractElasticProvider<
    d.redirectDetailQuery,
    l.redirectListQuery,
    redirectDetailQueryResponse['item'],
    redirectListQueryResponse['items']
> {}
