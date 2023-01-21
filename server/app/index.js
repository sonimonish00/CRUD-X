// This is Express Application other names of file could be - app.js, main.js etc. but i prefer index.js bcz its exporting `app` as module name, so just to differentiate.
// [TODO] : Refactor like https://github.com/hagopj13/node-express-boilerplate/blob/master/src/app.js

// import multer from "multer "; // For multipart/form-data
import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/v1/user.route.js";
import { ErrorHandler } from "./middlewares/errorHandler.middleware.js";
import { BadRequest400Error, Api404Error } from "./utils/customErrors.js";
const app = express();

// Middlewares : Built-in + Custom
app.use(express.json()); // For Content-Type: application/json -> Builtin
app.use(express.urlencoded({ extended: true })); // To parse urlencoded req. body app/x-www-form-urlencoded
app.use(cors()); // For using CORS -> Builtin
app.options("*", cors()); // include before other routes - CORS preflight request -> Builtin

// Routes : Homepage URL -> http://localhost:2000/
app.get("/", (req, res) => {
  res.send("Welcome to homepage (Dashboard)");
});

// Routes (API - V1) : Users -> http://localhost:2000/v1/users
// [TODO] : Other Routes for Admin, Manager, Salesman Role.
// [TODO] : Apply `express-rate-limit` middleware to each route specially `auth` route
// [TODO] : Optimize to app.use("/v1", userRoutes) => see "./routes/v1/index.js"
app.use("/v1/users", userRoutes); //Always version in ur API & Req/Res Header

// (2nd Last) MIDDLEWARE : send back 404 err for any unknown api request
// Alternative : app.get('*') -> not recommended though
app.use((req, res, next) => {
  const err = new Api404Error(
    "Esa koi Route hi Exist Nai krta - URL me gadbad hein bhai !!"
  );
  err.source =
    "index.js -> second last middleware `Api404Error` indicating url doesn't exist";
  err.data = err;
  next(err);
});

// (Last) MIDDLEWARE  : Last express middleware to handle custom errors centrally
// app.use(errorHandler); -> Delete this if all works fine
app.use(ErrorHandler.handle());

export { app };

/* 
Ref. Links
  - API Versioning : https://github.com/RootSoft/API-Naming-Convention#versioning
*/
