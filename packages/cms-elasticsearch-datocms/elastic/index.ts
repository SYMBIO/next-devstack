import { Client } from '@elastic/elasticsearch';

export default function getElastic(): Client {
    return new Client({
        node: process.env.ELASTIC_URL,
        auth: {
            apiKey: {
                id: String(process.env.ELASTIC_API_KEY_ID),
                api_key: String(process.env.ELASTIC_API_KEY),
            },
        },
    });
}
