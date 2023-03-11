const { addToLiked, removeFromLiked } = require('../models/liked/liked');
const { HTTP } = require('../helpers/constants');

const onAddToLiked = async (req, res, next) => {
  try {
    const newProduct = await addToLiked(req.user.id, req.body.productId);

    return res.status(HTTP.CREATE).json({
      status: 'success',
      code: HTTP.CREATE,
      data: { newProduct },
    });
  } catch (e) {
    next(e);
  }
};

const onRemoveFromLiked = async (req, res, next) => {
  try {
    await removeFromLiked(req.user.id, req.params.productId);

    return res.json({
      status: 'success',
      code: HTTP.OK,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  onAddToLiked,
  onRemoveFromLiked,
};
