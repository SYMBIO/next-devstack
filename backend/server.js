require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

const next = require('next');
const express = require('express');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 8000;
const ROOT = __dirname + '/..';

const app = next({ dev, dir: ROOT });
const handle = app.getRequestHandler();
const server = express();

app.prepare().then(() => {
    const server = express();

    server.use('/api', routes);

    server.get('/products', (req, res) => {
        return app.render(req, res, '/error', req.query);
    });

    server.get('/products/:slug', (req, res) => {
        return app.render(req, res, '/product', Object.assign({}, req.query, req.params));
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        if (dev) console.log(`> Ready on http://localhost:${PORT}`);
    });
});