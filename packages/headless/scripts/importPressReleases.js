/* eslint-disable */
const dayjs = require('dayjs');
const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const buildModularBlock = require('datocms-client').buildModularBlock;
const data = require('../data/ppf_group_pro.json');
const origSlugify = require('slugify');

dotenv.config();

const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

function slugify(str) {
    return origSlugify(str, { remove: /[^\w\s-]/g, lower: true });
}

const files = data.find((item) => item.name === 'cms_files');
const pressReleasesCs = data.find((item) => item.name === 'cs_press_releases');
const pressReleasesEn = data.find((item) => item.name === 'en_press_releases');
const pressReleasesBlocksCs = data.find((item) => item.name === 'cs_press_releases_blocks');
const pressReleasesBlocksEn = data.find((item) => item.name === 'en_press_releases_blocks');
const pressReleasesBlocksFilesCs = data.find((item) => item.name === 'cs_press_releases_blocks_files');
const pressReleasesBlocksFilesEn = data.find((item) => item.name === 'en_press_releases_blocks_files');

const CATEGORIES_MAP = {
    1: '18947990',
    2: '16928876',
    3: '18947979',
    4: '18947979',
    5: '18947982',
    6: '17472851',
};

async function job() {
    const companies = await client.items.all(
        {
            filter: {
                type: '494869',
            },
        },
        { allPages: true },
    );

    for (const pressRelease of pressReleasesCs.data) {
        const enPressRelease = pressReleasesEn.data.find((enPress) => enPress.publicated === pressRelease.publicated);

        const pressReleaseBlockCs = pressReleasesBlocksCs.data.filter(
            (block) => block.press_releas_id === pressRelease.id,
        );

        if (!pressReleaseBlockCs) {
            continue;
        }

        let pressReleaseBlockEn = [];
        if (enPressRelease) {
            pressReleaseBlockEn = pressReleasesBlocksEn.data.filter(
                (block) => block.press_releas_id === enPressRelease.id,
            );
        }

        let contentCs = [];
        for (const pressReleaseBlock of pressReleaseBlockCs) {
            if (pressReleaseBlock.cms_block_name === 'content') {
                contentCs.push(
                    buildModularBlock({
                        itemType: '480096',
                        text: pressReleaseBlock.content,
                    }),
                );
            }

            if (pressReleaseBlock.cms_block_name === 'files') {
                const fileBlockCs = pressReleasesBlocksFilesCs.data.find(
                    (block) => block.press_releases_block_id === pressReleaseBlockCs.id,
                );
                let fileCs = null;
                if (fileBlockCs) {
                    fileCs = files.data.find((file) => file.id === fileBlockCs.cms_file_id);
                }

                if (fileCs) {
                    const pathCs = await client.createUploadPath(`./scripts/files/${fileCs.name}`);
                    const uploadCs = await client.uploads.create({
                        path: pathCs,
                        defaultFieldMetadata: {
                            cs: {
                                alt: pressRelease.name,
                                title: pressRelease.name,
                                custom_data: {},
                            },
                            en: {
                                alt: enPressRelease ? enPressRelease.name : pressRelease.name,
                                title: enPressRelease ? enPressRelease.name : pressRelease.name,
                                custom_data: {},
                            },
                        },
                    });
                    contentCs.push(
                        buildModularBlock({
                            itemType: '531816',
                            files: [
                                {
                                    uploadId: uploadCs.id,
                                    alt: pressRelease.name,
                                    title: pressRelease.name,
                                    custom_data: {},
                                },
                            ],
                            title: null,
                        }),
                    );
                }
            }
        }

        let contentEn = [];
        for (const pressReleaseBlock of pressReleaseBlockEn) {
            if (pressReleaseBlock.cms_block_name === 'content') {
                contentEn.push(
                    buildModularBlock({
                        itemType: '480096',
                        text: pressReleaseBlock.content,
                    }),
                );
            }

            if (pressReleaseBlock.cms_block_name === 'files') {
                let fileBlockEn = null;
                if (pressReleaseBlockEn) {
                    fileBlockEn = pressReleasesBlocksFilesEn.data.find(
                        (block) => block.press_releases_block_id === pressReleaseBlockEn.id,
                    );
                }

                let fileEn = null;
                if (fileBlockEn) {
                    fileEn = files.data.find((file) => file.id === fileBlockEn.cms_file_id);
                }

                if (fileEn) {
                    const pathEn = await client.createUploadPath(`./scripts/files/${fileEn.name}`);
                    const uploadEn = await client.uploads.create({
                        path: pathEn,
                        defaultFieldMetadata: {
                            en: {
                                alt: enPressRelease ? enPressRelease.name : pressRelease.name,
                                title: enPressRelease ? enPressRelease.name : pressRelease.name,
                                custom_data: {},
                            },
                            cs: {
                                alt: pressRelease.name,
                                title: pressRelease.name,
                                custom_data: {},
                            },
                        },
                    });

                    contentEn.push(
                        buildModularBlock({
                            itemType: '531816',
                            files: [
                                {
                                    uploadId: uploadEn.id,
                                    alt: enPressRelease ? enPressRelease.name : pressRelease.name,
                                    title: enPressRelease ? enPressRelease.name : pressRelease.name,
                                    custom_data: {},
                                },
                            ],
                            title: null,
                        }),
                    );
                }
            }
        }

        const company = companies.find((comp) => String(comp.oldCmsId) === pressRelease.company_id);

        if (enPressRelease) {
            const data = {
                itemType: '493682',
                title: {
                    cs: pressRelease.name,
                    en: enPressRelease.name,
                },
                slug: {
                    cs: slugify(pressRelease.name),
                    en: slugify(enPressRelease.name),
                },
                category: CATEGORIES_MAP[pressRelease.press_releases_category_id],
                company: company ? company.id : null,
                dateFrom: dayjs(pressRelease.publicated).format(),
                backgroundImage: null,
                content: {
                    cs: contentCs,
                    en: contentEn,
                },
                annotation: {
                    cs: pressRelease.anotation,
                    en: enPressRelease.anotation,
                },
                metaTags: {
                    cs: null,
                    en: null,
                },
            };
            try {
                await client.items.create(data);
            } catch (e) {
                if (e.body.data[0].attributes.details.code === 'VALIDATION_UNIQUE') {
                    await client.items.create({
                        ...data,
                        slug: {
                            cs: slugify(`${pressRelease.name}-${dayjs().unix()}`),
                            en: slugify(`${enPressRelease.name}-${dayjs().unix()}`),
                        },
                    });
                }
            }
        } else {
            const data = {
                itemType: '493682',
                title: {
                    cs: pressRelease.name,
                },
                slug: {
                    cs: slugify(pressRelease.name),
                },
                category: CATEGORIES_MAP[pressRelease.press_releases_category_id],
                company: company ? company.id : null,
                dateFrom: dayjs(pressRelease.publicated).format(),
                backgroundImage: null,
                content: {
                    cs: contentCs,
                },
                annotation: {
                    cs: pressRelease.anotation,
                },
                metaTags: {
                    cs: null,
                },
            };
            try {
                await client.items.create(data);
            } catch (e) {
                if (e.body.data[0].attributes.details.code === 'VALIDATION_UNIQUE') {
                    await client.items.create({
                        ...data,
                        slug: {
                            cs: slugify(`${pressRelease.name}-${dayjs().unix()}`),
                        },
                    });
                }
            }
        }
    }

    for (const pressRelease of pressReleasesEn.data) {
        const csPressRelease = pressReleasesCs.data.find((enPress) => enPress.publicated === pressRelease.publicated);
        if (!csPressRelease) {
            const pressReleaseBlocks = pressReleasesBlocksEn.data.filter(
                (block) => block.press_releas_id === pressRelease.id,
            );
            let content = [];
            for (const pressReleaseBlock of pressReleaseBlocks) {
                if (pressReleaseBlock.cms_block_name === 'content') {
                    content.push(
                        buildModularBlock({
                            itemType: '480096',
                            text: pressReleaseBlock.content,
                        }),
                    );
                }

                if (pressReleaseBlock.cms_block_name === 'files') {
                    const fileBlock = pressReleasesBlocksFilesEn.data.find(
                        (block) => block.press_releases_block_id === pressReleaseBlock.id,
                    );
                    let file = null;
                    if (fileBlock) {
                        file = files.data.find((file) => file.id === fileBlock.cms_file_id);
                    }

                    if (file) {
                        const path = await client.createUploadPath(`./scripts/files/${file.name}`);
                        const upload = await client.uploads.create({
                            path: path,
                            defaultFieldMetadata: {
                                en: {
                                    alt: pressRelease.name,
                                    title: pressRelease.name,
                                    custom_data: {},
                                },
                                cs: {
                                    alt: pressRelease.name,
                                    title: pressRelease.name,
                                    custom_data: {},
                                },
                            },
                        });
                        content.push(
                            buildModularBlock({
                                itemType: '531816',
                                files: [
                                    {
                                        uploadId: upload.id,
                                        alt: pressRelease.name,
                                        title: pressRelease.name,
                                        custom_data: {},
                                    },
                                ],
                                title: null,
                            }),
                        );
                    }
                }
            }

            const company = companies.find((comp) => String(comp.oldCmsId) === pressRelease.company_id);

            await client.items.create({
                itemType: '493682',
                title: {
                    en: pressRelease.name,
                },
                slug: {
                    en: slugify(pressRelease.name),
                },
                category: CATEGORIES_MAP[pressRelease.press_releases_category_id],
                company: company ? company.id : null,
                dateFrom: dayjs(pressRelease.publicated).format(),
                backgroundImage: null,
                content: {
                    en: content,
                },
                annotation: {
                    en: pressRelease.anotation,
                },
                metaTags: {
                    en: null,
                },
            });
        }
    }
}

job();
