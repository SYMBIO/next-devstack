/* eslint-disable */
const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const fs = require('fs');

dotenv.config();

const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

client.itemTypes.all().then(async (items) => {
    const data = items.reduce((acc, curr) => {
        acc[curr.apiKey] = curr.id;
        return acc;
    }, {});
    await fs.promises.writeFile('./src/models.json', JSON.stringify(data));
});
