const Auth = require('../schemas/authSchemas');

const getCart = async userId => {
  const { cart } = await Auth.findOne({ _id: userId }).populate({
    path: 'cart',
  });
  return cart;
};

const addToCart = async (userId, productId) => {
  const { cart } = await Auth.findOneAndUpdate(
    { _id: userId },
    { $push: { cart: productId } },
    { new: true },
  ).populate({
    path: 'cart',
  });

  return cart.find(item => item.id === productId);
};

const removeFromCart = async (userId, productId) => {
  const { cart } = await Auth.findOneAndUpdate(
    { _id: userId },
    { $pull: { cart: { $in: productId } } },
  ).populate({
    path: 'cart',
  });
  return cart.find(item => item.id === productId);
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};
