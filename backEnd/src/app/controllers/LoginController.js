import User from '../models/User';

import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

class LoginController {
  static async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }});

    if(!user) {
      return res.status(400).json({ error: 'Email or password is invalid!'})
    }

    if(await password && !(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'email or password is invalid!'})
    }

    if(user.administrator === false) {
      return res.status(401).json({ error: 'User is not adminstrator!'})
    }

    const { id, name } = user;

    return res.json({
      id,
      name,
      email,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default LoginController;
