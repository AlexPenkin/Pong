const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();
app.use(serve('dist/'));
app.listen(8000);

// eslint-disable-next-line no-console
console.log('listening on port 8000');
