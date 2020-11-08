# Roman Numeral

This is demo on how to do a client server communication using server-send event. 

## Client 

The client code is inside `client/`folder, it's made with React.js.

To build the client do `npm run build` inside the `client/` folder, it will transpile the source and put the result in the `client/dist/` folder. 

The `server/` folder contain a symbolic link that point the `client/dist/` folder, it is use so the sever can serve the client as a webserver.

### Development

For development purpose you can start the client on it's own with `npm start` and watch for change with `npm run watch`. Webpack is configured to redirect the request and to the server API on port 3000.

Please read the Webpack documentation for further information.

## Server

The server code is inside `server/` folder, it's made with Express.js.

To start the server do `npm start` inside the `server/` folder.

The server will serve the client, so it's better to build the client first.

### Development

You can run the test suite of the server with `npm run test`.
