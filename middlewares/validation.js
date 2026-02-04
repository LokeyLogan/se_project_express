const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

/**
 * Custom URL validation using validator.isURL()
 * We return Joi's built-in "string.uri" error type so celebrate responds consistently.
 */
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// validation for user signup
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid url',
    }),
    email: Joi.string().email().required().messages({
      "string.email": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// validation for login (signin)
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.email": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// validation for updating current user
const validateUpdateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string().custom(validateURL).messages({
        "string.uri": 'The "avatar" field must be a valid url',
        "string.empty": 'The "avatar" field must be filled in',
      }),
    })
    .min(1),
});

// validation for clothing item creation
const validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required().messages({
      "any.only": 'The "weather" field must be one of: hot, warm, cold',
      "string.empty": 'The "weather" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),
  }),
});

// validation for IDs in route params
// This validates either userId or itemId when they appear in routes
const validateIdParam = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).messages({
      "string.hex": 'The "userId" must be a hexadecimal value',
      "string.length": 'The "userId" must be 24 characters long',
    }),
    itemId: Joi.string().hex().length(24).messages({
      "string.hex": 'The "itemId" must be a hexadecimal value',
      "string.length": 'The "itemId" must be 24 characters long',
    }),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateUser,
  validateCreateItem,
  validateIdParam,
};
