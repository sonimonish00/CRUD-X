import { httpStatusCodes } from "../utils/httpStatusCodes.js";
import { asyncWrapTC } from "../utils/tryCatchAsync.helper.js";
import * as userService from "../services/user.service.js";
import * as authService from "../services/auth.service.js";
import * as tokenService from "../services/tokenAuth.service.js";

// [TODO] : Two Roles are required for RBAC-Authorization (Auth-R) : `admin` and `user`
const register = asyncWrapTC(async (req, res) => {
  const user = await userService.addUser(req, res);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatusCodes.CREATED).send({ user, tokens });
});

const login = asyncWrapTC(async (req, res) => {
  const { emailID, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(
    emailID,
    password
  );
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = asyncWrapTC(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatusCodes.NO_CONTENT).send();
});

const refreshTokens = asyncWrapTC(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

// <------ Not sure below one's will works or not. just included here ---->
const forgotPassword = asyncWrapTC(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.emailID
  );
  await emailService.sendResetPasswordEmail(
    req.body.emailID,
    resetPasswordToken
  );
  res.status(httpStatusCodes.NO_CONTENT).send();
});

const resetPassword = asyncWrapTC(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatusCodes.NO_CONTENT).send();
});

const sendVerificationEmail = asyncWrapTC(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatusCodes.NO_CONTENT).send();
});

const verifyEmail = asyncWrapTC(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatusCodes.NO_CONTENT).send();
});
// <============ ENDS HERE ============>

const authController = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};

export { authController };

/* Reference Links, Code & Info
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/controllers/auth.controller.js
*/
