/* eslint-disable no-undef */
module.exports = {
    auth: {
        basic: [
            {
                login: 'symbio',
                password: 'password',
            },
        ],
    },
    cache: {
        maxAge: 10,
    },
    datocms: {
        domain: 'symbio-template.admin.datocms.com',
        pageTypeId: '184261',
    },
    i18n: {
        useLocaleInPath: true,
    },
    gtm: {
        code: false, // GTM-XXXXXXX
    },
    mailer: {
        from: 'no-reply@example.com',
        name: 'SYMBIO',
    },
    newsletter: {
        subject: 'New newsletter subscription',
        to: 'subscriber@example.com',
        body: `The new subscriber has just confirmed the newsletter. 
 
E-mail: {EMAIL}
`,
    },
    pageCache: process.env.NODE_ENV === 'production' ? 'redis' : 'none', // "none" | "memory" | "redis"
    tz: 'Europe/Prague',
};
