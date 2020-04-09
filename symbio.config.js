export default {
    auth: {
        basic: [
            {
                login: 'symbio',
                password: 'password',
            },
        ],
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
};
