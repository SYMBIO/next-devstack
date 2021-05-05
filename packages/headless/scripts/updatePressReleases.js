/* eslint-disable */
const dayjs = require('dayjs');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const buildModularBlock = require('datocms-client').buildModularBlock;

dayjs.extend(isSameOrBefore);
dotenv.config();

const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

const RICH_TEXT_BLOCK_ID = '480096';

async function job() {
    const pressReleases = await client.items.all(
        {
            filter: {
                type: '493682',
            },
        },
        { allPages: true },
    );

    const allItems = await client.items.all({}, { allPages: true });

    for (const pressRelease of pressReleases) {
        if (dayjs(pressRelease.dateFrom).isSameOrBefore('2019-10-31')) {
            let csContent = pressRelease.content.cs;
            let enContent = pressRelease.content.en;
            const csAnnotation = pressRelease.annotation.cs;
            const enAnnotation = pressRelease.annotation.en;

            const csModularBlock = csContent && csContent[0] && allItems.find((i) => i.id === csContent[0]);
            const enModularBlock = enContent && enContent[0] && allItems.find((i) => i.id === enContent[0]);

            const finalAnnotation = {
                ...(csAnnotation ? { cs: csAnnotation } : {}),
                ...(enAnnotation ? { en: enAnnotation } : {}),
            };

            if (csModularBlock && csModularBlock.itemType === RICH_TEXT_BLOCK_ID) {
                let text = csModularBlock.text;
                const annotationStart = text.indexOf('<p>');
                const annotationEnd = text.indexOf('</p>') + 4;
                const annotation = text.substring(annotationStart, annotationEnd);
                let annotationCleared = annotation
                    .replace('<p>', '')
                    .replace('</p>', '')
                    .replace('<p>', '')
                    .replace(/\r/, '')
                    .replace(/\t/, '')
                    .replace(/\n/, '');

                if (!csAnnotation) {
                    finalAnnotation.cs = annotationCleared;
                }
                if (annotation.includes(finalAnnotation.cs)) {
                    annotationCleared = annotationCleared.replace(finalAnnotation.cs, '');
                    if (annotationCleared.length > 0) {
                        text = text.replace(finalAnnotation.cs, '');
                    } else {
                        text = text.replace(annotation, '');
                    }
                }

                csContent = [
                    buildModularBlock({
                        itemType: RICH_TEXT_BLOCK_ID,
                        text,
                    }),
                    ...csContent.slice(1),
                ];
            }
            if (enModularBlock && enModularBlock.itemType === RICH_TEXT_BLOCK_ID) {
                let text = enModularBlock.text;
                const annotationStart = text.indexOf('<p>');
                const annotationEnd = text.indexOf('</p>') + 4;
                const annotation = text.substring(annotationStart, annotationEnd);
                let annotationCleared = annotation
                    .replace('<p>', '')
                    .replace('</p>', '')
                    .replace('<p>', '')
                    .replace(/\r/, '')
                    .replace(/\t/, '')
                    .replace(/\n/, '');

                if (!enAnnotation) {
                    finalAnnotation.en = annotationCleared;
                }
                if (annotation.includes(finalAnnotation.en)) {
                    annotationCleared = annotationCleared.replace(finalAnnotation.en, '');
                    if (annotationCleared.length > 0) {
                        text = text.replace(finalAnnotation.en, '');
                    } else {
                        text = text.replace(annotation, '');
                    }
                }

                enContent = [
                    buildModularBlock({
                        itemType: RICH_TEXT_BLOCK_ID,
                        text,
                    }),
                    ...enContent.slice(1),
                ];
            }

            const item = {
                annotation: finalAnnotation,
                content: {
                    ...(csContent ? { cs: csContent } : {}),
                    ...(enContent ? { en: enContent } : {}),
                },
            };

            await client.items.update(pressRelease.id, item);
            await client.items.publish(pressRelease.id);
        }
    }
}

job();
