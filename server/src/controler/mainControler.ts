import { Response, Request } from 'express';
import Clients from '../clients';
import { arabToRoman } from '../converter/romanNumber';
import returnJson from '../utils/returnJson';

let messageId = 0;

export function eventArabToRomanController(req: Request, res: Response): void {
  // Mandatory headers and http status to keep connection open
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  });

  res.write('\n');

  // save the client response into a client objet
  // to be able to get it later with the client_id cookie
  const client = Clients.find(req.cookies.client_id);
  if (client === undefined && req.cookies.client_id) {
    Clients.push({
      id: req.cookies.client_id,
      res,
    });
  }
}

export function queryArabToRomanController(req: Request, res: Response): void {
  try {
    const arabNb = req.body.nb;

    if (isNaN(arabNb)) {
      throw new Error(`${arabNb} is not a number`);
    }

    // if the client has made a server-send event request
    const client = Clients.find(req.cookies.client_id);

    // if the client exist (meaning it has opened a SSE request)
    if (client) {
      const romanNb = arabToRoman(arabNb);
      client.res.write(`id: ${messageId}\n`);
      client.res.write(`event: romanNb\n`);
      client.res.write(`data: {"romanNb": "${romanNb}"}\n\n`);
      messageId++;
    }

    returnJson(res);
  } catch (error) {
    console.error(error);
    returnJson(res, null, error.message);
  }
}
