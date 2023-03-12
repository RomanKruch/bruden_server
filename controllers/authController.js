const {
  register,
  updateToken,
  findByEmail,
  findById,
} = require('../models/auth/auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { HTTP } = require('../helpers/constants');

const onRegister = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findByEmail(email);

    if (user) {
      return res.status(HTTP.CONFLICT).json({
        status: 'conflict',
        code: HTTP.CONFLICT,
        data: {
          massage: 'Email is already used',
        },
      });
    }

    const newUser = await register({ ...req.body });
    const id = newUser._id;
    const token = jwt.sign({ id }, process.env.SECRET_KEY);
    await updateToken(id, token);

    return res.status(HTTP.CREATE).json({
      status: 'success',
      code: HTTP.CREATE,
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const onLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);

    if (!user || !user?.validPassword(password)) {
      return res.status(HTTP.UNAUTHORIZED).json({
        status: 'error',
        code: HTTP.UNAUTHORIZED,
        data: {
          massage: 'Unauthorized',
        },
      });
    }

    const id = user._id;
    const token = jwt.sign({ id }, process.env.SECRET_KEY);

    await updateToken(id, token);
    return res.json({
      status: 'success',
      code: HTTP.OK,
      data: {
        user: {
          name: user.name,
          email: user.email
        },
        token,
        cart: user.cart,
        liked: user.liked
      },
    });
  } catch (error) {
    next(error);
  }
};

const onLogout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await updateToken(id, null);
    return res.status(HTTP.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

const onRefresh = async (req, res, next) => {
  try {
    const user = await findById(req.user.id);

    if (user) {
      res.json({
        status: 'success',
        code: HTTP.OK,
        data: {
          user: {
            name: user.name,
            email: user.email,
          },
          cart: user.cart,
          liked: user.liked,
        },
      });
    } else {
      res.status(HTTP.NOT_FOUND).json({
        status: 'error',
        code: HTTP.NOT_FOUND,
        data: {
          massage: 'not found',
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  onRegister,
  onLogin,
  onLogout,
  onRefresh,
};
