import AbstractSingletonElasticProvider from '../../cms/lib/AbstractSingletonElasticProvider';
import * as d from '../../relay/__generated__/webSettingQuery.graphql';
import { webSettingQuery } from '../../relay/webSetting';

export default class WebSettingProvider extends AbstractSingletonElasticProvider<d.webSettingQuery> {}
