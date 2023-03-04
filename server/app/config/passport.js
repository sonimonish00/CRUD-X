import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./config.js";
import { tokenTypes } from "./tokens.js";
import { User } from "../models/user.model.js";

// <========================== JWT Strategy ==============================>
// JWT Options : `Secret Key` (Random from env) & `JWT` Fro Req. Auth Header(Bearer)
const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Verify JWT Token Type (AT,RT) & Find user by id from DB coresponding to jwt & return that user
const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

// Strategy : Secret Key + JWT Bearer Token + Payload & Token-Type
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

// <========================== GOOGLE OAUTH 2.0 Strategy ===============================>
// Google Options - `CallbackURL` should match with `redirect URIs` registered in G Cloud console - https://console.cloud.google.com

const googleOptions = {
  clientID: config.googleOauth2.client_id,
  clientSecret: config.googleOauth2.client_secret,
  callbackURL:
    "https://crud-x-production.up.railway.app/v1/auth/loginGoogleOAuth2",
};

// Google Callback Fn.
const googleVerify = function (
  accessToken,
  refreshToken,
  profile,
  email,
  done
) {
  return done(null, email);
};

// Google OAuth 2.0 Strategy
const googleOAuth2Strategy = new GoogleStrategy(googleOptions, googleVerify);

export { jwtStrategy, googleOAuth2Strategy };

/* Reference Link 
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/config/passport.js
*/
