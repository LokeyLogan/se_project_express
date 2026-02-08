const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.error("string.uri");
};

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().email().required(),
    password: Joi.string().required(), // they don't require min length here
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
    })
    .min(1),
});

const validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: Joi.string().required().custom(validateURL),
  }),
});

const validateIdParam = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string().hex().length(24),
      itemId: Joi.string().hex().length(24),
    })
    .unknown(true), // allows routes that only have one of the two
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateUser,
  validateCreateItem,
  validateIdParam,
};
