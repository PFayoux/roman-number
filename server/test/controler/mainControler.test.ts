import { eventArabToRomanController } from '../../src/controler/mainControler';

import Clients from '../../src/clients';
jest.mock('../../src/clients');

describe('Test eventArabToRomanController', () => {
  it('Should write the head and write \\n inside the event-stream', () => {
    const req = {
      cookies: {
        client_id: undefined,
      },
    };
    const res = {
      write: jest.fn(),
      writeHead: jest.fn(),
    };
    eventArabToRomanController(req, res);

    expect(res.writeHead).toHaveBeenCalledTimes(1);
    expect(res.write).toHaveBeenCalledWith('\n');
    expect(res.write).toHaveBeenCalledTimes(1);
  });

  it('Should save the client if the client_id cookie is set', () => {
    const req = {
      cookies: {
        client_id: 'test',
      },
    };

    const res = {
      write: jest.fn(),
      writeHead: jest.fn(),
    };
    eventArabToRomanController(req, res);

    expect(Clients.find).toHaveBeenCalledTimes(2);
    expect(Clients.find).toHaveBeenCalledWith(req.cookies.client_id);
    expect(Clients.push).toHaveBeenCalledTimes(1);
    expect(Clients.push).toHaveBeenCalledWith({
      id: req.cookies.client_id,
      res,
    });
  });
});
