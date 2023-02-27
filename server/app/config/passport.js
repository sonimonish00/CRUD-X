// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/config/passport.js
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "./config.js";
import { tokenTypes } from "./tokens.js";
import { User } from "../models/user.model.js";

// JWT Options : `Secret Key` (Random from env) & `JWT` Fro Req. Auth Header(Bearer)
const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Verify JWT Token Type (AT,RT etc.) & Find user by id from DB coresponding to jwt & return that user
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

export { jwtStrategy };
