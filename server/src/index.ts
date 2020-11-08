import { Request, Response } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './route';
import * as http from 'http';
import { AddressInfo } from 'net';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import cookie from './middleware/cookie';

// create express app
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(cookie);

app.use(express.static('dist'));

app.get('/status', (req: Request, res: Response) => res.json({ status: 'Started' }));

// register express routes from defined application routes
routes().forEach((route) => {
  app[route.method](route.route, ...route.middleware, route.controller);
});

app.start = function () {
  // initialize a server listening to https
  const server = http.createServer(app);

  // start the server on port 3000
  server.listen(3000, 'localhost', () => {
    const addressInfo = server.address() as AddressInfo;
    const baseUrl = 'http://localhost:' + addressInfo.port;
    app.emit('started', baseUrl);

    console.info(`Express server listening at : %s%s`, baseUrl, '/');
  });
};

export default app;

if (require.main === module) {
  app.start();
}
