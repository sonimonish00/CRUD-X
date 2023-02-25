// This is Express Application other names of file could be - app.js, main.js etc. but i prefer index.js bcz its exporting `app` as module name, so just to differentiate.
// [TODO] : Refactor like https://github.com/hagopj13/node-express-boilerplate/blob/master/src/app.js

// import multer from "multer "; // For multipart/form-data
import express from "express";
import cors from "cors";
// import { userRoutes } from "./routes/v1/user.route.js";
import routes from "./routes/v1/index.js";
import { ErrorHandler } from "./middlewares/errorHandler.middleware.js";
import { ApiError } from "./utils/customErrors.js";
import { httpStatusCodes } from "./utils/httpStatusCodes.js";
import morgan from "./config/morgan.js";
import config from "./config/config.js";

const app = express();

// Middlewares : Built-in + Custom

// Morgan HTTP Logger
if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(express.json()); // For Content-Type: application/json -> Builtin
app.use(express.urlencoded({ extended: true })); // To parse urlencoded req. body app/x-www-form-urlencoded

app.use(cors()); // For using CORS -> Builtin
app.options("*", cors()); // include before other routes - CORS preflight request -> Builtin

// Routes : Homepage URL -> http://localhost:2000/ & Favicon Handling
// [IMP] : Below is unprotected route, you could include middleware to protect it, see extra code below.
app.get("/", (req, res) => {
  res.send("Welcome to homepage (Dashboard)");
});
app.get("/favicon.ico", (req, res) => {
  res.status(204);
});

// Routes (API - V1) : Users -> http://localhost:2000/v1/
// Always version in ur API & Req/Res Header
// [TODO] : Other Routes for Admin, Manager, Salesman Role.
// [TODO] : Apply API Limit via `express-rate-limit` middleware to `auth` route
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

// Include this as middleware in any route to make it protected token password is `123`
const testTokenAuthHeaderBearerMiddleware = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization?.split(" ")[1];
  return !token
    ? res.status(403).json({ error: "Token is not present" })
    : token !== "123"
    ? res.status(400).json({ error: "Wrong Token" })
    : next();
};

*/
