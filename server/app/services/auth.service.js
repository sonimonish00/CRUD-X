// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/services/auth.service.js
import { httpStatusCodes } from "../utils/httpStatusCodes.js";
import { ApiError } from "../utils/customErrors.js";

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {};

export {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
