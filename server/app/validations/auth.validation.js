// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/validations/auth.validation.js
// [TODO] : Implement validations
import Joi from "@hapi/joi";
import { password } from "./custom.validation";

const register = {};

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
