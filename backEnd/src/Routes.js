import { Router } from 'express';

import UserController from './app/controllers/UserController';

class Routes {
  constructor() {
    this.route = new Router();

    this.listUsers();
    this.createUser();
  }

  listUsers() {
    return this.route.get('/users', UserController.index);
  }

  createUser() {
    return this.route.post('/users', UserController.store);
  }
}

export default new Routes().route;
