import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByEmail as findUserByUsername } from '../models/user-model.js';

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const user = await findUserByUsername(username);
    if (!user) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      user: payload,
      token
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  res.json({
    message: 'Token valid',
    user: req.user
  });
};

export { login, getMe };
