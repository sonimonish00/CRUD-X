// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/services/token.service.js
import jwt from "jsonwebtoken";
import moment from "moment";
import { httpStatusCodes } from "../utils/httpStatusCodes.js";
import config from "../config/config.js";
import * as userService from "../services/user.service.js";
import { Token } from "../models/tokenAuth.model.js";
import { ApiError } from "../utils/customErrors.js";
import { tokenTypes } from "../config/tokens.js";

/**
 * Generate token : Generate a new token (RT+AT) via jwt.sign() method
 * @param {ObjectId} userId
 * @param {moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  // `exp` in payload is Equivalent to adding 3rd param { expiresIn: '1800s'} in jwt.sign(), you could choose any method. Both are optional.
  return jwt.sign(payload, secret);
};

/**
 * Save a token : via create() in table with foreign ref. to userID. Useful after new token gen.
 * @param {string} token
 * @param {ObjectId} userId
 * @param {moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

/**
 * Generate auth tokens : Generate 2 tokens (AT/RT) via generateToken() & save RT via saveToken().
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

// <============ Not sure below one's will works or not. just included here ============>
/**
 * Generate reset password token : Give back RPT which can be used to reset pass.rest is upto client
 * @param {string} email_id
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email_id) => {
  const user = await userService.getUserByEmail(email_id);
  if (!user) {
    throw new ApiError(
      httpStatusCodes.NOT_FOUND,
      "No users found with this email"
    );
  }
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    "minutes"
  );
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user) => {
  const expires = moment().add(
    config.jwt.verifyEmailExpirationMinutes,
    "minutes"
  );
  const verifyEmailToken = generateToken(
    user.id,
    expires,
    tokenTypes.VERIFY_EMAIL
  );
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};
// <============ ENDS HERE ============>

export {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};
