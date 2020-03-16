import Sequelize from 'sequelize';

import configDatabase from '../config/database';
import User from '../app/models/User';

class ConnectionDB {
  constructor() {
    this.connection = new Sequelize(configDatabase);
    this.models = [User];

    this.init();
  }

  init() {
    return this.models.map(model => model.init(this.connection));
  }
}

export default new ConnectionDB();
