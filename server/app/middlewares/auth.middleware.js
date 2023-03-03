// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/middlewares/auth.js
import passport from "passport";
import { httpStatusCodes } from "../utils/httpStatusCodes.js";
import { ApiError } from "../utils/customErrors.js";
import { roleRights } from "../config/roles.js";

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatusCodes.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(httpStatusCodes.FORBIDDEN, "Forbidden"));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

const googleOAuth2Middleware = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export { auth, googleOAuth2Middleware };
