// This is Express Application other names of file could be - app.js, main.js etc. but i prefer index.js bcz its exporting `app` as module name, so just to differentiate.
// [TODO] : Refactor like https://github.com/hagopj13/node-express-boilerplate/blob/master/src/app.js

// import multer from "multer "; // For multipart/form-data
import express from "express";
import cors from "cors";
import routes from "./routes/v1/index.js";
import { ErrorHandler } from "./middlewares/errorHandler.middleware.js";
import { ApiError } from "./utils/customErrors.js";
import { httpStatusCodes } from "./utils/httpStatusCodes.js";
import morgan from "./config/morgan.js";
import config from "./config/config.js";
import passport from "passport";
import { jwtStrategy, googleOAuth2Strategy } from "./config/passport.js";
import path from "path";
import { fileURLToPath } from "url";
import { auth, googleOAuth2Middleware } from "./middlewares/auth.middleware.js";
import session from "express-session";

const app = express();

// Middlewares : Built-in + Custom
app.use(
  session({
    secret: "123456",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Morgan HTTP Logger
if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
// app.use(helmet());

app.use(express.json()); // For Content-Type: application/json -> Builtin
app.use(express.urlencoded({ extended: true })); // For app/x-www-form-urlencoded (Form-action)

// sanitize request data
// app.use(xss());
// app.use(mongoSanitize());

// gzip compression
// app.use(compression());

// Configuring ES6 path for dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serving Static index.html
app.use("/", express.static(path.join(__dirname, "views")));
// OR If you dont want to use html paste below code in route section
/*
  app.get("/", (req, res) => {
    res.send(
      "Welcome to CRUD-X Website's Default Page. (Unprotected Route : No Login/Signup Req.) "
      );
    });
*/

app.use(cors()); // For using CORS -> Builtin
app.options("*", cors()); // include before other routes - CORS preflight request -> Builtin

// jwt & google Oauth2 authentication [Passport] + Cookie-Session to store user info from google OAuth
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use("jwt", jwtStrategy);
passport.use(googleOAuth2Strategy);

// Routes : Favicon, Default Route, Home/Dashboard Route
app.get("/favicon.ico", (req, res) => {
  res.status(204);
});

// Google OAuth 2 Routes
app.get("/SignInWithGoogleOAuth2Button", googleOAuth2Middleware);
// You could separate out below middleware into auth.middleware.js [Future Refactored]
const isGoogleOauthLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("You are Unauthorized, Error 401");
  }
};
app.get("/home", isGoogleOauthLoggedIn, (req, res) => {
  res.send(
    `Welcome to Google OAuth 2.0 Verified User Homepage (Dashboard) [Protected]. You've successfully LoggedIn/Authenticated via Google OAuth 2.0. Your Name is : ${req.user.displayName} & Email-ID is : ${req.user.emails[0].value}`
  );
});
// Again you could separte out this in Auth RCS [Future Refactored]
app.get("/logoutGoogleOAuth2", (req, res, next) => {
  // Destroying session
  req.session.destroy();
  res.status(httpStatusCodes.NO_CONTENT).send();
  // req.logout(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.status(httpStatusCodes.NO_CONTENT).send();
  //   // OR you could redirect to default route - res.redirect("/")
  // });
});

// Normal JWT Auth Homepage
app.get("/home-jwt", auth(), (req, res) => {
  res.send(
    "Welcome to Homepage (Dashboard) [Protected Route]. Welcome `User`, You have successfully Logged In !!"
  );
});

// Routes (API - V1) : Users -> http://localhost:2000/v1/<your-routes>
// [TODO] : Other Routes for Admin, Manager, Salesman Role. Apply API Limit via `express-rate-limit` middleware to `auth` route
app.use("/v1", routes);

// MIDDLEWARE : For all other unknow routes
app.use((req, res, next) => {
  next(new ApiError(httpStatusCodes.NOT_FOUND, "URL Doesn't exist !!"));
});

// (Last) MIDDLEWARE  : Last express middleware to handle custom errors centrally
app.use(ErrorHandler.handle());

export { app };

/* 
Ref. Links
  - API Versioning : https://github.com/RootSoft/API-Naming-Convention#versioning
*/

/* Extra Code 

// Include this as middleware in any route to make it protected - token is `123`
const isUserAuthorized = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  return !token
    ? res.status(403).json({ error: "Token is not present" })
    : token !== "123"
    ? res.status(400).json({ error: "Wrong Token" })
    : next();
};

*/
