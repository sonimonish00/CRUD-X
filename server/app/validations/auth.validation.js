import Joi from "@hapi/joi";
import { password } from "./custom.validation.js";

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    emailID: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid("user", "admin"),
  }),
};

const login = {
  body: Joi.object().keys({
    emailID: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

// <============ Not sure below one's will works or not. just included here ============>
const forgotPassword = {
  body: Joi.object().keys({
    emailID: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};
// <============ ENDS HERE ============>

const authValidation = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};

export { authValidation };

/* Reference Links, Code & Info [#Auth Module Related]
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/validations/auth.validation.js
*/
