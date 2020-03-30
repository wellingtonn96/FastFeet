import { Router } from 'express';

import authMiddlewares from './app/mIddleware/auth';

import UserController from './app/controllers/UserController';
import RecipentController from './app/controllers/RecipentController';
import LoginController from './app/controllers/LoginController';

class Routes {
  constructor() {
    this.route = new Router();

    this.login();

    this.authMiddlewares();

    this.listUsers();
    this.createUser();
    this.listRecipients();
    this.createRecipient();
    this.updateUser();
    this.deleteUser();
  }

  login() {
    return this.route.post('/login', LoginController.store);
  }
  // middlewares

  authMiddlewares() {
    return this.route.use(authMiddlewares);
  }

  // user
  listUsers() {
    return this.route.get('/users', UserController.index);
  }

  createUser() {
    return this.route.post('/users', UserController.store);
  }

  updateUser() {
    return this.route.put('/users/:id/update', UserController.update);
  }

  deleteUser() {
    return this.route.delete('/users/:id/delete', UserController.delete);
  }

  listRecipients() {
    return this.route.get('/recipients', RecipentController.index);
  }

  // recipent
  createRecipient() {
    return this.route.post('/recipients', RecipentController.store);
  }
}

export default new Routes().route;
