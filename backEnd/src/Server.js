import 'dotenv/config';

import express, { json } from 'express';

import Routes from './Routes';

import './database/ConnectionDB';

class Server {
  constructor() {
    this.server = express();

    this.middelwares();
    this.routes();
    this.upServer();
  }

  upServer() {
    this.server.listen(3333);
  }

  middelwares() {
    this.server.use(json());
  }

  routes() {
    this.server.use(Routes);
  }
}

export default new Server().server;
