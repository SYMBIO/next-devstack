/* eslint-disable */
const { Client } = require('@elastic/elasticsearch');
const dotenv = require('dotenv');
const { SiteClient, buildModularBlock } = require('datocms-client');

dotenv.config();

const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);
const elastic = new Client({
    node: process.env.ELASTIC_URL,
    auth: {
        apiKey: {
            id: String(process.env.ELASTIC_API_KEY_ID),
            api_key: String(process.env.ELASTIC_API_KEY),
        },
    },
    ssl: {
        rejectUnauthorized: false,
    },
});

const toPascal = (s) => {
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return s.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

const blockTypes = {
    Error404BlockRecord: '480088',
    YoutubeVimeoBlockRecord: '480091',
    NewsListFloorBlockRecord: '480092',
    NewsListBlockRecord: '480093',
    VideoBlockRecord: '480094',
    ButtonBlockRecord: '480095',
    RichTextBlockRecord: '480096',
    ImageBlockRecord: '480097',
    GalleryBlockRecord: '480099',
    NewsDetailBlockRecord: '480101',
    HomepageBlockRecord: '485994',
    InsightsBlockRecord: '485995',
    InsightDetailBlockRecord: '485996',
    CompanyListBlockRecord: '485997',
    CompanyDetailBlockRecord: '485998',
    FinancialResultsBlockRecord: '486069',
    FinancialStatementsBlockRecord: '486070',
    CareerDetailBlockRecord: '486073',
    PressReleasesBlockRecord: '518907',
    PersonsFloorBlockRecord: '518911',
    SubscribeNewsletterBlockRecord: '518975',
    MediaDownloadBlockRecord: '518979',
    AnchorPagesBlockRecord: '518990',
    ContactsFloorBlockRecord: '525374',
    GroupAssetsBlockRecord: '529576',
    CareerCompanyBlockRecord: '529591',
    CompanyContactListBlockRecord: '529598',
    SiteMapBlockRecord: '529619',
    AnnualReportsBlockRecord: '529912',
    HistoryBlockRecord: '529913',
    CareerSearchBlockRecord: '541211',
    CareerInCompaniesBlockRecord: '541216',
    DownloadFloorBlockRecord: '531816',
    EthicalLineBlockRecord: '530978',
    ImageTextBlockRecord: '530311',
};

function processBlock(b) {
    if (b === null || b.__typename === 'GroupAssetsBlockRecord') {
        return null;
    }

    if (b.__typename === 'CompanyListBlockRecord') {
        b['textFoundCompanies'] = 'Nalezené společnosti';
    }

    const { __typename, id, ...other } = b;
    const bdata = {};
    for (const key in other) {
        const o = other[key];
        if (typeof o === 'object') {
            if (o === null) {
                bdata[key] = null;
            } else if (Array.isArray(o)) {
                if (o.length > 0 && o[0].size) {
                    bdata[key] = o.map((file) => ({
                        uploadId: file.id,
                        alt: file.title,
                        title: file.title,
                        focalPoint: null,
                    }));
                } else if (o.length > 0 && o[0].id) {
                    bdata[key] = o.map((file) => file.id);
                } else if (key === 'categories') {
                    bdata[key] = ['16916747'];
                } else if (key === 'interests') {
                    bdata[key] = [];
                } else {
                    console.log(b, key);
                    throw new Error('Pole neznamych objektu!');
                }
            } else if (!o.id) {
                if (o.__typename === 'HeroRecord' || key === 'hero') {
                    bdata[key] = '17928990';
                } else {
                    console.log(b, key);
                    throw new Error('Neni ID objektu v bloku!');
                }
            } else if (o.url && o.hasOwnProperty('alt')) {
                bdata[key] = {
                    uploadId: o.id,
                    alt: o.title,
                    title: o.title,
                    focalPoint: null,
                };
            } else {
                bdata[key] = o.id;
            }
        } else {
            bdata[key] = o;
        }
    }

    return buildModularBlock({
        itemType: blockTypes[b.__typename],
        ...bdata,
    });
}

async function job() {
    const a = await client.items.all(
        {
            'filter[type]': '542347',
            'page[limit]': 500,
            version: 'current',
        },
        { allPages: true },
    );
    await client.items.bulkDestroy({ items: a.map((aa) => aa.id) });

    const csdata = (
        await elastic.search({
            index: 'page_cs_v1',
            body: {
                query: {
                    match_all: {},
                },
                sort: [{ 'parent.id': { order: 'asc', missing: '_first' } }, { position: 'desc' }],
                size: 1000,
            },
        })
    ).body.hits.hits;

    const endata = (
        await elastic.search({
            index: 'page_en_v1',
            body: {
                query: {
                    match_all: {},
                },
                sort: [{ 'parent.id': 'asc' }, { position: 'asc' }],
                size: 1000,
            },
        })
    ).body.hits.hits;

    const parents = new Map();

    for (const cs_page of csdata) {
        const en_page = endata.find((p) => p._id === cs_page._id);
        const cs_s = cs_page._source;
        const en_s = en_page._source;

        if (cs_s.isLight !== undefined && cs_s.url) {
            console.log(cs_s.url, en_s.url);
            const page = {
                content: en_s.url
                    ? {
                          cs: cs_s.content ? cs_s.content.map(processBlock).filter((b) => b) : [],
                          en: en_s.content ? en_s.content.map(processBlock).filter((b) => b) : [],
                      }
                    : {
                          cs: cs_s.content ? cs_s.content.map(processBlock) : [],
                      },
                hero: cs_s.hero,
                isLight: cs_s.isLight,
                metaTags: en_s.url
                    ? {
                          cs: null,
                          en: null,
                      }
                    : {
                          cs: null,
                      },
                parentId: cs_s.parent ? parents.get(cs_s.parent.id) : null,
                position: cs_s.position,
                title: en_s.url
                    ? {
                          cs: cs_s.title,
                          en: en_s.title,
                      }
                    : {
                          cs: cs_s.title,
                      },
                url: en_s.url
                    ? {
                          cs: cs_s.url,
                          en: en_s.url,
                      }
                    : {
                          cs: cs_s.url,
                      },
            };

            const newPage = await client.items.create({
                itemType: '542347',
                ...page,
            });

            parents.set(cs_s.id, newPage.id);

            // return;
        }
    }
}

job();
