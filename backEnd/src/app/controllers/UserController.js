import User from '../models/User';

class UserController {
  static async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  static async store(req, res) {
    const { email } = req.body;
    const userExistis = await User.findOne({
      where: { email },
    });

    if(userExistis) {
      return res.status(401).json({ error: 'Users already existis!'});
    }

    const user = await User.create(req.body);

    return res.json({
      message: 'Created user succestully!',
      user,
    });
  }
}

export default UserController;
