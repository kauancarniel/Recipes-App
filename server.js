const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'src', 'data', 'db.json'));
const middlewares = jsonServer.defaults();

const port = 5000;

server.use(middlewares);

server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running');
});
