import Sequelize from 'sequelize';

import configDatabase from '../config/database';
import User from '../app/models/User';
import Recipients from '../app/models/Recipient';

class ConnectionDB {
  constructor() {
    this.connection = new Sequelize(configDatabase);
    this.models = [User, Recipients];

    this.init();
  }

  init() {
    return this.models.map(model => model.init(this.connection));
  }
}

export default new ConnectionDB();
