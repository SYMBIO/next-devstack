/* eslint-disable */
const dayjs = require('dayjs');
const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const data = require('../data/ppf_group_pro.json');

dotenv.config();

const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

const files = data.find((item) => item.name === 'cms_files');
const financialReportsCs = data.find((item) => item.name === 'cs_financial_reports');
const financialReportsEn = data.find((item) => item.name === 'en_financial_reports');
const financialReportsBlocksCs = data.find((item) => item.name === 'cs_financial_reports_blocks');
const financialReportsBlocksEn = data.find((item) => item.name === 'en_financial_reports_blocks');
const financialReportsBlocksFilesCs = data.find((item) => item.name === 'cs_financial_reports_blocks_files');
const financialReportsBlocksFilesEn = data.find((item) => item.name === 'en_financial_reports_blocks_files');

const annualReportsCs = financialReportsCs.data.filter((item) => item.financial_reports_category_id === '1');
const annualReportsEn = financialReportsEn.data.filter((item) => item.financial_reports_category_id === '1');

async function job() {
    for (const report of annualReportsCs.slice(1)) {
        const uriSplit = report.cms_uri.split('-');
        const uriPart = uriSplit.pop();
        const enReport = annualReportsEn.find((enReport) => enReport.cms_uri.split('-').pop() === uriPart);

        const blockReportCs = financialReportsBlocksCs.data.find(
            (block) => block.financial_report_id === report.id && block.cms_block_name === 'files',
        );
        const blockReportEn = financialReportsBlocksEn.data.find(
            (block) => block.financial_report_id === enReport.id && block.cms_block_name === 'files',
        );

        const fileBlockCs = financialReportsBlocksFilesCs.data.find(
            (block) => block.financial_reports_block_id === blockReportCs.id,
        );
        const fileBlockEn = financialReportsBlocksFilesEn.data.find(
            (block) => block.financial_reports_block_id === blockReportEn.id,
        );

        const fileCs = files.data.find((file) => file.id === fileBlockCs.cms_file_id);
        const fileEn = files.data.find((file) => file.id === fileBlockEn.cms_file_id);

        const pathCs = await client.createUploadPath(`./scripts/files/${fileCs.name}`);
        const pathEn = await client.createUploadPath(`./scripts/files/${fileEn.name}`);
        const uploadCs = await client.uploads.create({
            path: pathCs,
            defaultFieldMetadata: {
                cs: {
                    alt: report.name,
                    title: report.name,
                    custom_data: {},
                },
                en: {
                    alt: enReport.name,
                    title: enReport.name,
                    custom_data: {},
                },
            },
        });
        const uploadEn = await client.uploads.create({
            path: pathEn,
            defaultFieldMetadata: {
                en: {
                    alt: enReport.name,
                    title: enReport.name,
                    custom_data: {},
                },
                cs: {
                    alt: report.name,
                    title: report.name,
                    custom_data: {},
                },
            },
        });

        await client.items.create({
            itemType: '529864',
            title: {
                cs: report.name,
                en: enReport.name,
            },
            date: dayjs(report.publicated).subtract(1, 'year').format(),
            pdf: {
                cs: {
                    uploadId: uploadCs.id,
                    alt: report.name,
                    title: report.name,
                    custom_data: {},
                },
                en: {
                    uploadId: uploadEn.id,
                    alt: enReport.name,
                    title: enReport.name,
                    custom_data: {},
                },
            },
        });
    }
}

job();
