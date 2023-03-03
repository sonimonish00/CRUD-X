// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/routes/v1/auth.route.js

// API Routes for Auth : router.post('/register', validate(authValidate.register), authController.register)
// [TODO] : Swagger Defintions (API Docs)

import express from "express";
import { validate } from "../../middlewares/validateJoi.middleware.js";
import { authValidation } from "../../validations/auth.validation.js";
import { authController } from "../../controllers/auth.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";
import passport from "passport";

const authRoute = express.Router();

authRoute.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
authRoute.post("/login", validate(authValidation.login), authController.login);
authRoute.post(
  "/logout",
  validate(authValidation.logout),
  authController.logout
);
authRoute.post(
  "/refresh-tokens",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

// For Below Route i'm not creating Controller or service, mixing all here at once, will do if refactored in future
authRoute.get(
  "/loginGoogleOAuth2",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/home");
  }
);

// <============ Not sure below one's will works or not. just included here ============>
authRoute.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
authRoute.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);
authRoute.post(
  "/send-verification-email",
  auth(),
  authController.sendVerificationEmail
);
authRoute.post(
  "/verify-email",
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);
// <============ ENDS HERE ============>

export default authRoute;
