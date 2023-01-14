// import multer from "multer "; // For multipart/form-data
import express from "express";
import { userRoutes } from "./routes/user.route.js";
const app = express();

// Middlewares (Built-in + Custom)
// app.use(logger,HttpLogger) - APM Logging Middleware (errLoggingAPM.js) ==> Will skip as of now
// Also API Documentation of Error using Swagger
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/usematurelogger.md
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/testingerrorflows.md
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/apmproducts.md
app.use(express.json()); // For Content-Type: application/json
// app.use(cors()); // For using CORS
// app.use(express.urlencoded({ extended: true })); // For application/x-www-form-urlencoded

// Roles : User, Admin, Manager, Salesman
// Routes -> REST API Endpoints (CRUD) : Role (User)
// Naming convention : user small/plural nouns (not verbs)
// API Versioning : https://github.com/RootSoft/API-Naming-Convention#versioning
// Routes : Homepage URL -> http://localhost:2000
app.get("/", (req, res) => {
  res.send("Welcome to homepage (Dashboard)");
});
// Routes : Users Routes -> http://localhost:2000/users
app.use("/users", userRoutes);

// NOTE : Express will stop using its default err handler(500) once you create a custom err handler like below.
// Middleware (Last) -> Express Custom Error Handler to send 400 and 500 as a fallback
// This Middleware could be written separtely in error.middleware.js and could be imported here, but for small scale i think i can ignore as of now
// [TODO] : Could wrap winston,morgan APM middleware and this express middleware logic into erroHandler.js but i dont think thats a good approach plus for small scale not req., even express middleware cud be separated into module. but that will be to hectic for this small scale project
// Error handling middleware functionality
// [PENDING] : Below Error Middleware -> Error Handler(errorHandler.js - Didnt created).
// FLOW : Some module throws an error (Service->Controller) =>
//        API router catches the error (Router via tryCatchAsync() & next(error)) =>
//        it propagates the error to the middleware (e.g. or to other mechanism for catching request-level error) who is responsible for catching errors (via app.use(errorMiddleware)) =>
//        A centralized error handler is called. (errorHandler.middleware.js which has ifchecks of custom errors and also) =>
//        Checks if error is operational ? If it is Handle error(logging,mailing,APM) else restart (PM2)

const errorMiddleware = (err, req, res, next) => {
  console.log("==> All unkown Error Comes here at middleware from controller");
  console.log("--> " + err.source);
  console.log("--> " + err.statusCode);
  res.status(err.statusCode || 500).json({
    status: err.statusCode,
    message: err.message,
    stack: err.stack,
  });
};
app.use(errorMiddleware);

/* ==> SEPARATE & USE MULTIPLE MIDDLEWARE LIKE THIS ALSO 
// https://web.archive.org/web/20160205174437/https://www.joyent.com/developers/node/design/errors
// https://scoutapm.com/blog/express-error-handling 
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/shuttingtheprocess.md 
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/catchunhandledpromiserejection.md
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/centralizedhandling.md 
https://github.com/hagopj13/node-express-boilerplate
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/documentingusingswagger.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/failfast.md 
https://javascript.plainenglish.io/error-handling-in-node-js-like-a-pro-ed210baa0600
https://reflectoring.io/express-error-handling/ 
https://github.com/thombergs/code-examples/tree/master/nodejs/errorhandling/js 
https://www.robinwieruch.de/node-express-error-handling/
https://medium.com/@SigniorGratiano/mongoose-and-express-68994fcfdeff
https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7
https://simonplend.com/how-to-create-an-error-handler-for-your-express-api/
https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/#error-classes
https://levelup.gitconnected.com/handling-errors-in-mongoose-express-for-display-in-react-d966287f573b
https://buttercms.com/blog/express-js-error-handling/
https://github.com/tlaanemaa/http-error-classes

function errorLogger(error, req, res, next) {
  // for logging errors
  console.error(error); // or using any fancy logging library
  next(error); // forward to next middleware
}
function errorResponder(error, req, res, next) {
  // responding to client
  if (error.type == "redirect") res.redirect("/error");
  else if (error.type == "time-out")
    // arbitrary condition check
    res.status(408).send(error);
  else next(error); // forwarding exceptional case to fail-safe middleware
}
function failSafeHandler(error, req, res, next) {
  // generic handler
  res.status(500).send(error);
}
app.use(errorLogger);
app.use(errorResponder);
app.use(failSafeHandler);
*/

// OR Alternative : Custom AsyncHelper Middleware Fn
// function asyncHelper(fn) {
//   return function (req, res, next) {
//     fn(req, res, next).catch(next);
//   };
// }
// app.get('*', asyncHelper(async (req, res) => { // Express Error Handling async/await
//   await new Promise(resolve => setTimeout(() => resolve(), 40));
//   throw new Error('Error found');
// }));
// app.get("*", (req, res, next) => {
//   setImmediate(() => {
//     next(new Error("Something went wrong")); // Error goes via `next()` method
//   });
// });
export { app };
