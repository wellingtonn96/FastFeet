import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(connectionDB) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        complement: Sequelize.STRING,
      },
      {
        sequelize: connectionDB,
      }
    );
  }
}

export default Recipient;
