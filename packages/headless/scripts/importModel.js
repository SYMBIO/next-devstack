/* eslint-disable */
import { Logger } from '../src/services';

const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const fs = require('fs');
const { promisify } = require('util');

dotenv.config();

const client = new SiteClient('process.env.DATOCMS_API_TOKEN_FULL');

async function loadTemplate(path) {
    const readFile = promisify(fs.readFile);
    const json = await readFile(path);
    const { plugins, itemTypes } = JSON.parse(json);
    const ownPlugins = (await client.plugins.all()).map(({ id, url }) => ({ id, url }));
    const pluginMap = {};
    for (const op of ownPlugins) {
        for (const p of plugins) {
            if (p.url === op.url) {
                pluginMap[p.id] = op.id;
            }
        }
    }

    for (const itemType of itemTypes) {
        await createItemType(itemType, pluginMap);
    }
}

async function createItemType(itemType, pluginMap) {
    const {
        allLocalesRequired,
        apiKey,
        collectionAppeareance,
        draftModeActive,
        modularBlock,
        name,
        orderingDirection,
        orderingField,
        singleton,
        sortable,
        titleField,
        tree,
    } = itemType;

    Logger.log('CREATE ITEM TYPE', {
        allLocalesRequired,
        apiKey,
        collectionAppeareance,
        draftModeActive,
        modularBlock,
        name,
        singleton,
        sortable,
        tree,
    });
    const newItemType = await client.itemTypes.create({
        allLocalesRequired,
        apiKey,
        collectionAppeareance,
        draftModeActive,
        modularBlock,
        name,
        singleton,
        sortable,
        tree,
    });

    const fieldIdMap = {};
    for (const field of itemType.fields) {
        const newField = await createField(field, newItemType, pluginMap);
        fieldIdMap[field.id] = newField.id;
    }

    Logger.log('UPDATE ITEM TYPE', newItemType.id, {
        allLocalesRequired,
        apiKey,
        collectionAppeareance,
        draftModeActive,
        modularBlock,
        name,
        orderingDirection,
        orderingField: orderingField ? fieldIdMap[orderingField] : null,
        singleton,
        sortable,
        titleField: titleField ? fieldIdMap[titleField] : null,
        tree,
    });

    await client.itemTypes.update(newItemType.id, {
        allLocalesRequired,
        apiKey,
        collectionAppeareance,
        draftModeActive,
        modularBlock,
        name,
        orderingDirection,
        orderingField: orderingField ? fieldIdMap[orderingField] : null,
        singleton,
        sortable,
        titleField: titleField ? fieldIdMap[titleField] : null,
        tree,
    });

    return newItemType;
}

async function createField(field, itemType, pluginMap) {
    const { apiKey, appeareance, defaultValue, fieldType, hint, label, localized, position, validators } = field;
    const modBlockMap = {};

    if (field.fieldType === 'rich_text') {
        for (const modBlock of field.validators.richTextBlocks.itemTypes) {
            const newModBlock = await createItemType(modBlock, pluginMap);
            Logger.log(newModBlock);
            modBlockMap[modBlock.id] = newModBlock.id;
        }
        field.validators.richTextBlocks.itemTypes = field.validators.richTextBlocks.itemTypes.map(
            (i) => modBlockMap[i.id],
        );
    }

    appeareance.addons = appeareance.addons
        .map((a) => {
            if (pluginMap[a.id]) {
                return {
                    id: pluginMap[a.id],
                    parameters: a.parameters,
                };
            } else {
                return false;
            }
        })
        .filter((a) => a);

    Logger.log('CREATE FIELD', itemType.id, {
        apiKey,
        appeareance,
        defaultValue,
        fieldType,
        hint,
        label,
        localized,
        position,
        validators,
    });

    return await client.fields.create(itemType.id, {
        apiKey,
        appeareance,
        defaultValue,
        fieldType,
        hint,
        label,
        localized,
        position,
        validators,
    });
}

async function getItemType(itemTypeId) {
    const itemType = await client.itemTypes.find(itemTypeId);
    for (const i in itemType.fields) {
        itemType.fields[i] = await client.fields.find(itemType.fields[i]);
    }

    for (const field of itemType.fields) {
        if (field.fieldType === 'rich_text') {
            for (const i in field.validators.richTextBlocks.itemTypes) {
                field.validators.richTextBlocks.itemTypes[i] = await getItemType(
                    field.validators.richTextBlocks.itemTypes[i],
                );
            }
        }
    }

    return itemType;
}

if (process.argv.length < 3) {
    throw new Error('Too few arguments');
}

loadTemplate(process.argv[2]);
