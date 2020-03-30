// index listar todos os usuarios
// store criação de usuarios
// show e um metodo para listar um usuario
// upgrade e pra atualizar um usuario
// delete para deletar um usuario

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

    if (userExistis) {
      return res.status(401).json({ error: 'Users already existis!' });
    }

    const user = await User.create(req.body);

    return res.json({
      message: 'Created user succestully!',
      user,
    });
  }

  static async update(req, res) {
    const { email, password, newPassword } = req.body;

    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(401).json({ message: 'user not existis!' });
    }

    if (email) {
      const emailIsValid = await User.findOne({ where: { email } });

      if (emailIsValid) {
        return res.status(401).json({ message: 'email exists' });
      }
    }

    if (password && !(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'password invalid!' });
    }

    user.password = newPassword;

    const result = await user.update(req.body);

    return res.status(200).json(result);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(401).json({ message: 'user not existis!' });
    }

    await user.destroy();

    return res.status(200).json({ message: 'user deleted succestully' });
  }
}

export default UserController;
