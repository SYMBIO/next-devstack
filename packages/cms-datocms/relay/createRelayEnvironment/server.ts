import axios from 'axios';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import { Logger } from '@symbio/headless/dist/services';

export const createRelayEnvironment = (records: RecordMap, preview = false): Environment =>
    new Environment({
        network: Network.create(async (operation, variables) => {
            if (!process.env.DATOCMS_API_TOKEN) {
                throw new Error('No API token!');
            }

            try {
                const { data } = await axios('https://graphql.datocms.com/' + (preview ? 'preview' : ''), {
                    data: JSON.stringify({ query: operation.text, variables }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: process.env.DATOCMS_API_TOKEN,
                    },
                    method: 'POST',
                    responseType: 'json',
                });

                return data;
            } catch (e) {
                Logger.log('ERROR');
                Logger.log(operation.text?.substr(0, 200), variables);
                Logger.error(e);
            }
        }),
        store: new Store(new RecordSource(records)),
    });
