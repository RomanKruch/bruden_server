const Joi = require('joi');
const { HTTP } = require('./constants');

module.exports = validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HTTP.BAD,
      message: `Filed: ${message.replace(/"/g, '')}`,
    });
  }
  next();
};
