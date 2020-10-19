import AbstractSingletonElasticProvider from '../../lib/provider/AbstractSingletonElasticProvider';
import * as d from '../../relay/__generated__/webSettingQuery.graphql';
import { webSettingQuery } from '../../relay/webSetting';

class WebSettingProvider extends AbstractSingletonElasticProvider<d.webSettingQuery> {
    getApiKey(): string {
        return 'web_setting';
    }

    getId(): string {
        return '260446';
    }
}

export default new WebSettingProvider(webSettingQuery);
