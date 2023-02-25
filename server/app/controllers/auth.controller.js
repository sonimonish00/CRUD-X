// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/controllers/auth.controller.js
import { httpStatusCodes } from "../utils/httpStatusCodes.js";
import { asyncWrapTC } from "../utils/tryCatchAsync.helper.js";
import {
  authService,
  userService,
  tokenService,
  emailService,
} from "../services/auth.service.js";

const register = asyncWrapTC(async (req, res) => {});

const authController = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};

export { authController };
