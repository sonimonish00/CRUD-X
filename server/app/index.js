// Module (index.js) : Express Application (Aka app.js, main.js etc.)
// Current Arch. : MVC (Tech. Role based) => Future Arch. : Comp. based

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
// import multer from "multer "; // For multipart/form-data

const app = express();
// Configuring ES6 path for dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// <========== Middleware (Part 1) : Builtin/Custom | Logging | Passport Auth. =============>
app.use(
  session({
    // secret should be env file, but for as now it's hard coded
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

app.use(express.json()); // For Content-Type: application/json -> Builtin
app.use(express.urlencoded({ extended: true })); // For app/x-www-form-urlencoded (Form-action)
// set security HTTP headers
// app.use(helmet());
// sanitize request data
// app.use(xss());
// app.use(mongoSanitize());
// gzip compression
// app.use(compression());

// Serving Static index.html (Alt Way : see below ref. code)
app.use("/", express.static(path.join(__dirname, "views")));

app.use(cors()); // For using CORS -> Builtin
app.options("*", cors()); // include before other routes - CORS preflight request -> Builtin

// [Passport] - jwt & google Oauth2 auth + express-Session to store user info from google OAuth
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
// <=============== Middleware (Part 1) : ENDS HERE ===============>

// <=============== API Routes: Favicon, Default, Home, Home-jwt, Main v1 ===============>
app.get("/favicon.ico", (req, res) => {
  res.status(204);
});

// Google OAuth 2 Routes
app.get("/SignInWithGoogleOAuth2Button", googleOAuth2Middleware);
// [IMP] : Separate out below middleware into auth.middleware.js [#Refactoring]
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

// [IMP] : Separate out belowin Auth RCS [#Refactoring]
app.get("/logoutGoogleOAuth2", (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  // res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  // res.header("Expires", "-1");
  // res.header("Pragma", "no-cache");
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.status(httpStatusCodes.NO_CONTENT).redirect("/");
});

// Normal JWT Auth Homepage
app.get("/home-jwt", auth(), (req, res) => {
  res.send(
    "Welcome to Homepage [Protected Route]. Welcome `User`, You have successfully Logged In !!"
  );
});

// Main API V1 Routes [/v1/] : /users, /auth, /docs
app.use("/v1", routes);
// <=============== API Routes: ENDS HERE ===============>

// <========== Middleware (Part 2) : Unknown routes | Error Handling =============>

// MIDDLEWARE : For all other unknow routes
app.use((req, res, next) => {
  next(new ApiError(httpStatusCodes.NOT_FOUND, "URL Doesn't exist !!"));
});

// (Last) MIDDLEWARE  : Last express middleware to handle custom errors centrally
app.use(ErrorHandler.handle());

// <========== Middleware (Part 2) : ENDS HERE =============>

export { app };

/* Reference Links, Code & Info
  - https://github.com/RootSoft/API-Naming-Convention#versioning
  https://github.com/hagopj13/node-express-boilerplate/blob/master/src/app.js
  
  - Include this as middleware in any route to make it protected - token is `123`
    const isUserAuthorized = (req, res, next) => {
      const token = req.headers.authorization?.split(" ")[1];
      return !token
        ? res.status(403).json({ error: "Token is not present" })
        : token !== "123"
        ? res.status(400).json({ error: "Wrong Token" })
        : next();
    };

  - If you dont want to use html paste below code in route section
    app.get("/", (req, res) => {
      res.send(
        "Welcome to CRUD-X Website's Default Page. (Unprotected Route : No Login/Signup Req.) "
        );
      });
  
  - [TODO] : Other Routes for Admin, Manager, Salesman Role. Apply API Limit via `express-rate-limit` middleware to `auth` route
*/
