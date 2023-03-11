const Joi = require('joi');
const { HTTP } = require('../../helpers/constants');
const validate = require('../../helpers/validate')

const productSchema = Joi.object({
  title: Joi.string().min(2).max(20).required(),
  price: Joi.number().required(),
  totalQty: Joi.number(),
  tag: Joi.string().required(),
  description: Joi.string().min(2).max(500).required(),
});

module.exports.product = (req, _res, next) => {
  const data = JSON.parse(req.body.data);
  delete data.img;
  delete data.largeImg;
  req.body = data
  return validate(productSchema, data, next);
};

module.exports.validateImg = (req, res, next) => {
  if (!req.files.img || !req.files.largeImg) {
    return res.status(HTTP.BAD).json({
      status: 'error',
      code: HTTP.BAD,
      data: 'Bad request',
      message: 'Field of img with file not found',
    });
  }
  next();
};