const Joi = require('joi');
const { HTTP } = require('../../helpers/constants');
const validate = require('../../helpers/validate')

const authSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().min(6).max(8),
});

module.exports.auth = (req, _res, next) => {
  return validate(authSchema, req.body, next);
};

module.exports.UploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HTTP.BAD).json({
      status: 'error',
      code: HTTP.BAD,
      data: 'Bad request',
      message: 'Field of avatar with file not found',
    })
  }
  next()
}