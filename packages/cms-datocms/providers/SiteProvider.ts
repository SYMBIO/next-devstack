import SingletonDatoCMSProvider from '../providers/SingletonDatoCMSProvider';
import * as d from '../relay/__generated__/siteQuery.graphql';
import { siteFragment } from '../relay/__generated__/siteFragment.graphql';

export type Site = Omit<siteFragment, ' $refType'>;

export default class SiteProvider extends SingletonDatoCMSProvider<d.siteQuery> {}
