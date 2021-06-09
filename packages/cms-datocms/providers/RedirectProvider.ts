import DatoCMSProvider from './DatoCMSProvider';
import { redirectDetailQueryResponse } from '../relay/__generated__/redirectDetailQuery.graphql';
import { redirectListQueryResponse } from '../relay/__generated__/redirectListQuery.graphql';
import * as d from '../relay/__generated__/redirectDetailQuery.graphql';
import * as l from '../relay/__generated__/redirectListQuery.graphql';

export default class RedirectProvider extends DatoCMSProvider<
    d.redirectDetailQuery,
    l.redirectListQuery,
    redirectDetailQueryResponse['item'],
    redirectListQueryResponse['items']
> {}
