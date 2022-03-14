/* eslint-disable */
const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const fs = require('fs');

dotenv.config();

const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

export async function generateModels() {
    const items = await client.itemTypes.all();
    const data = items.reduce((acc, curr) => {
        acc[curr.apiKey] = curr.id;
        return acc;
    }, {});
}

generateModels();
