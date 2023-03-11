const { addToCart, removeFromCart } = require('../models/cart/cart');
const { HTTP } = require('../helpers/constants');

const onAddToCart = async (req, res, next) => {
  try {
    const newProduct = await addToCart(req.user.id, req.body.productId);
    return res.status(HTTP.CREATE).json({
      status: 'success',
      code: HTTP.CREATE,
      data: { newProduct },
    });
  } catch (e) {
    next(e);
  }
};

const onRemoveFromCart = async (req, res, next) => {
  try {
    const product = await removeFromCart(req.user.id, req.params.productId);
    if (product) {
      return res.json({
        status: 'success',
        code: HTTP.OK,
      });
    }
    return res.status(HTTP.NOT_FOUND).json({
      status: 'error',
      code: HTTP.NOT_FOUND,
      data: {
        massage: 'Not found',
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  onAddToCart,
  onRemoveFromCart,
};
