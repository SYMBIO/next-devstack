/* eslint-disable */
const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const fs = require('fs');
const appDir = process.cwd();

dotenv.config();

const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

async function generateModels() {
    console.log('Downloading models from DatoCMS');
    const items = await client.itemTypes.all();
    const data = items.reduce((acc, curr) => {
        acc[curr.apiKey] = curr.id;
        return acc;
    }, {});
    const path = `${appDir}/src/models.json`;
    console.log(`Writing models' information to ${path}`);
    await fs.promises.writeFile(path, JSON.stringify(data));
    console.log('Done');
}

generateModels();

module.exports = {
    generateModels,
};
