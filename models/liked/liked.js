const Auth = require('../schemas/authSchemas');

const addToLiked = async (userId, productId) => {
  const { liked } = await Auth.findOneAndUpdate(
    { _id: userId },
    { $push: { liked: productId } },
    { new: true },
  ).populate({
    path: 'liked',
  });

  return liked.find(item => item.id === productId);
};

const removeFromLiked = async (userId, productId) => {
  await Auth.findOneAndUpdate(
    { _id: userId },
    { $pull: { liked: { $in: productId } } },
  )
};

module.exports = {
  addToLiked,
  removeFromLiked,
};
