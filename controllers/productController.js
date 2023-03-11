const { getProducts, getAllTags } = require('../models/product/product');
const { HTTP } = require('../helpers/constants');

const onGetProducts = async (req, res, next) => {
  try {
    const products = await getProducts(req.query);
    res.json({
      status: 'success',
      code: HTTP.OK,
      data: {
        ...products
      }
    });
  } catch (e) {
    next(e);
  }
};

const onGetTags = async (_req, res, next) => {
  try {
    const tags = await getAllTags();

    res.json({
      status: 'success',
      code: HTTP.OK,
      data: {
        tags
      }
    })

  } catch (e) {
    next(e)
  }
}

module.exports = {
  onGetProducts,
  onGetTags
};
