import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './route';
import { join } from 'path';
import * as http from 'http';
import { AddressInfo } from 'net';
const cors = require('cors');

// create express app
const app = express();

app.use(bodyParser.json());

app.use(express.static('dist'));

app.get('/status', (req, res) => res.json({ status: 'Started'}))

// register express routes from defined application routes
routes().forEach((route) => {
  app[route.method](
    route.route,
    ...route.middleware,
    route.controller,
  );
});

app.start = function () {
  // initialize a server listening to https
  const server = http.createServer(app);

  // start the server on port 3000
  server.listen(3000, 'localhost', () => {
    const addressInfo = server.address() as AddressInfo
    const baseUrl = 'http://localhost:' + addressInfo.port;
    app.emit('started', baseUrl);

    console.info(`Express server listening at : %s%s`, baseUrl, '/');
  });
};

app.start();