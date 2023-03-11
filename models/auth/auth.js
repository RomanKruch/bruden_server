const Auth = require('../schemas/authSchemas');

const findByEmail = async email => {
  return await Auth.findOne({ email })
  .populate({
    path: 'cart',
  })
  .populate({
    path: 'liked',
  });
};

const findById = async id => {
  return await Auth.findOne({ _id: id })
  .populate({
    path: 'cart',
  })
  .populate({
    path: 'liked',
  });
};

const register = async body => {
  const auth = new Auth({...body, cart: []});
  return await auth.save();
};

const updateToken = async (id, token) => {
  return await Auth.updateOne({ _id: id }, { token });
};

module.exports = {
  findByEmail,
  findById,
  register,
  updateToken,
};
