import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(connectionDB) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        administrator: Sequelize.BOOLEAN,
      },
      {
        sequelize: connectionDB,
      }
    );

    return this;
  }
}

export default User;
