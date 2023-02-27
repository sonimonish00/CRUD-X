// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/services/auth.service.js
import { httpStatusCodes } from "../utils/httpStatusCodes.js";
import * as userService from "../services/user.service.js";
import * as tokenService from "../services/tokenAuth.service.js";
import { Token } from "../models/tokenAuth.model.js";
import { ApiError } from "../utils/customErrors.js";
import { tokenTypes } from "../config/tokens.js";

/**
 * Login with username & password : just checking with user model to login
 * @param {string} emailID
 * @param {string} password
 * @returns {Promise<user>}
 */
const loginUserWithEmailAndPassword = async (emailID, password) => {
  const user = await userService.getUserByEmail(emailID);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(
      httpStatusCodes.UNAUTHORIZED,
      "Incorrect email or password"
    );
  }
  return user;
};

/**
 * Logout : just remove the refreshtoken (Don't blacklist as it's just logout)
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatusCodes.NOT_FOUND, "Not found");
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens : remove old RT (also blacklist) & generate New RT+AT
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatusCodes.UNAUTHORIZED, "Please authenticate");
  }
};

// [TODO] : Needs to modify when u actually implement Google OAuth
/**
 * Login with Google OAuth 2.0 : Will Send AT+RT to access Google API'S
 * @param {string} clientID
 * @param {string} clientSecret
 * @returns {Promise<result>}
 */
const loginUserWithGoogleOAuth = async (clientID, clientSecret) => {
  //passport-google logic may be
  let result = clientID + clientSecret;
  return result;
};

// <============ Not sure below one's will works or not. just included here ============>
/**
 * Reset password : Not sure will works or not. just included here
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatusCodes.UNAUTHORIZED, "Password reset failed");
  }
};

/**
 * Verify email : Not sure will works or not. just included here
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(
      httpStatusCodes.UNAUTHORIZED,
      "Email verification failed"
    );
  }
};
// <============ ENDS HERE ============>

export {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  loginUserWithGoogleOAuth,
  resetPassword,
  verifyEmail,
};
