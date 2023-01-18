// import multer from "multer "; // For multipart/form-data
import express from "express";
import { userRoutes } from "./routes/user.route.js";
import {
  errorHandler,
  ErrorHandler1,
} from "./middlewares/erroHandler.middleware.js";
import { BadRequest400Error, Api404Error } from "./util/errors/customErrors.js";
const app = express();

// Middlewares : Built-in + Custom
app.use(express.json()); // For Content-Type: application/json
// app.use(cors()); // For using CORS
// app.use(express.urlencoded({ extended: true })); // For application/x-www-form-urlencoded

// Routes : Homepage URL -> http://localhost:2000
app.get("/", (req, res) => {
  res.send("Welcome to homepage (Dashboard)");
});

// Routes : Users -> http://localhost:2000/users
// [TODO] : Other Routes for Admin, Manager, Salesman Role.
app.use("/users", userRoutes);

// Middleware : Last express middleware to handle custom errors centrally
// [TODO] : Will skip APM Logging middleware & API Docs as of now (see errorLogAPM.js for more info.)
// app.use(errorHandler);
// generalize the redirect for all routes that are not matched by our API. Therefore we can use a wildcard route with an * asterisk, but we need also make sure to use this route as the last route of all our routes. OR u cud use below middleware, just remeber it shud be second last and last one is for error handler. NOT SURE WHEther to use app.get or use
app.use((req, res, next) => {
  // send back a 404 error for any unknown api request
  // const err = new BadRequest400Error("OOPS NO URL ROUTE FOUND");
  // const err = new Api404Error("OOPS NO URL ROUTE FOUND");
  err.source =
    "index.js => 2nd last middleware `Api404Error` indicating url doesn't exist";
  err.data = err;
  next(err);
});
app.use(ErrorHandler1.handle());

export { app };

/* 
Ref. Links
  - API Versioning : https://github.com/RootSoft/API-Naming-Convention#versioning
*/
