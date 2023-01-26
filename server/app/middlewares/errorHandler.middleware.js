// Middleware (Express) : central error handling [Customized]

import { logger } from "../config/logger.js";
import { BaseError, ApiError } from "../utils/customErrors.js";
import { httpStatusCodes } from "../utils/httpStatusCodes.js";
import { mongoose } from "mongoose";
import config from "../config/config.js";

// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/middlewares/error.js
// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/app.js
// also : https://gist.github.com/kluu1/40b52b60a34676f00092685a43dfbecd#file-handleerrors-js
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/centralizedhandling.md
// [TODO] : Check if error is ops or not. If it is ops, Handle error(logging,mailing,APM) else restart (PM2)
/* JSON Schema (Libraries : joi, validator, ajv, jsonschema etc.)
   https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/validation.md
  {
    "status" : 'success/failORError', //err.status
    "source" : err.source // OR err.target OR  "source": { "pointer": "/data/attributes/firstName" },
    "statusCode" : 200, //err.statusCode 
    "message" : "My custom err msg or the one imported when i raised err", //err.message if not defined custom
    "data" : err.data, // for success {user : users}, for fail `null` [user.controller.js gAU fn]
    "meta" : {
      "type" : err.name, //Name of error ie. err.name
      "stack" : err.stack, //stack trace
      "title":  "User not Found",
      "detail": "The Database is empty"
    }
  }
*/
class ErrorHandler {
  // Operational errors (index.js -> Express app) [4xx, 5xx]
  static handle = () => {
    return async (err, req, res, next) => {
      // 1. Pre-processing : Converting errors to APIError (mongoose Err & 500 ISE are Programmer err hence flag is false)
      let error = err;
      if (!(error instanceof ApiError)) {
        const statusCode =
          error.statusCode || error instanceof mongoose.Error
            ? httpStatusCodes.BAD_REQUEST
            : httpStatusCodes.INTERNAL_SERVER;
        const message =
          error.message || "Mongoose or any other programmer error";
        error = new ApiError(statusCode, message, false, err.stack);
      }
      // 2. Processing error : sending appropiate response format & customization of error
      let { statusCode, message } = error;
      if (config.env === "production" && !err.isOperational) {
        statusCode = httpStatusCodes.INTERNAL_SERVER;
        message = "Internal Server Error !!";
      }
      res.locals.errorMessage = error.message;
      const responseJSONSchema = {
        code: statusCode,
        message,
        ...(config.env === "development" && { stack: error.stack }),
      };
      if (config.env === "development") logger.error(err);
      res.status(statusCode).json(responseJSONSchema);
    };
  };

  // Programmer errors (Server.js -> Express server)
  static initializeUnhandledException = () => {
    // globally handles `unhandled promise rejections`
    process.on("unhandledRejection", (reason, promise) => {
      logger.info("==> Comes here at unhandled promise rejection");
      // https://www.honeybadger.io/blog/errors-nodejs/
      // Honeybadger.notify({
      //   message: "Unhandled promise rejection",
      //   params: {
      //     promise,
      //     reason,
      //   },
      // });
      logger.error(reason);
      // OR log the error to winston
      // logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
      process.exit(1);

      // [TODO] : Vscode say below code is not reachable, delete if u think so
      // If graceful shutdown is not achieved after 1 sec, shutdown process completely
      setTimeout(() => {
        process.abort(); // exit immediately and generate a core dump file
      }, 1000).unref();
    });

    // globally handles `uncaught exceptions`
    // [TODO] : Needs modification https://github.com/hagopj13/node-express-boilerplate/blob/master/src/index.js
    process.on("uncaughtException", (error) => {
      // Honeybadger.notify(error); // log the error in a permanent storage
      logger.error(error);
      // OR log the error to winston
      // logger.error(`Uncaught Exception: ${error}`);

      if (!isOperationalErr(error)) {
        process.exit(1); // exit the process with a non-zero exit code - graceful shutdown
      }
      // https://www.honeybadger.io/blog/errors-nodejs/
      // If graceful shutdown is not achieved after 1 sec, shutdown process completely
      setTimeout(() => {
        process.abort(); // exit immediately and generate a core dump file
      }, 1000).unref();
    });
  };
}

// Helper fn -> If error is not operational i.e programmer err then return false
function isOperationalErr(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

export { ErrorHandler };

/*
  =======================================================================
                        errorHandler.middleware.js
  =======================================================================
  const errorLogger = (err, req, res, next) => {
    console.error('\x1b[31m', err) // adding some color to our logs or u cud use any fancy logging library
    next(err) // calling/forward to next middleware
  }
  const errorResponder = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack,
      });
  }
  const invalidPathHandler = (req, res, next) => {
    return res.status(301).redirect('/error');
    OR
    return res.status(400).json({err :"Bad req : URL doesn't exist !!"})
  }
  export = {errorLogger, errorResponder, invalidPathHandler, failSafeHandler}
  =======================================================================
                        index.js
  =======================================================================
  router.get('/error', (req, res) => {
    res.send("The URL you are trying to reach does not exist.")
  })
  
  app.get("*", (req, res, next) => next(new Api404Error("OOPS NO URL ROUTE FOUND"));
              OR
  app.use((req,res,next)=>{next(new Api404Error("OOPS NO URL ROUTE FOUND")}) ==> RECOMMENDED
  app.use(errorLogger);
  app.use(errorResponder);
  app.use(invalidPathHandler); // remove this if * is doin its work
*/

/* Alternative : Custom AsyncHelper Middleware Fn
  function asyncHelper(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(next);
    };
  }
  app.get('*', asyncHelper(async (req, res) => { // Express Error Handling async/await
    await new Promise(resolve => setTimeout(() => resolve(), 40));
    throw new Error('Error found');
  }));
  app.get("*", (req, res, next) => {
    setImmediate(() => {
      next(new Error("Something went wrong")); // Error goes via `next()` method
    });
  });
*/

//errorHandler.js -> not created yet
/*
  errorHandler.handleError(err).then((isOperationalError) => {
    if (!isOperationalError) next(err);
  });
*/
// OR
/*
const errorHandler = (error, request, response, next) => {
  if (error.statusCode === 401 && error.message === "Unauthorized") {
    // defining the HTTP status code
    const statusCode = 401;
    // standard HTTP 401 error message
    const message = "Unauthorized";
    // link to hosted version of the "how-to-handle-authentication" HTML page you can find in the /docs folder
    const authority = `${request.protocol}://${request.hostname}:${process.env.PORT}`;
    const documentationLink = `${authority}/docs/how-to-handle-authentication.html`;

    // implementing a custom error response on 401 errors matching the GitHub error response format
    response.status(statusCode).json({
      message: message,
      documentationLink: documentationLink,
    });
    return;
  }

  if (
    error.statusCode === 401 &&
    error.code === "invalid_token" &&
    error.message === "Permission denied"
  ) {
    // defining the HTTP status code
    const statusCode = 403;
    // standard HTTP 403 error message
    const message = "Forbidden";
    // link to hosted version of the "how-to-handle-authorization" HTML page you can find in the /docs folder
    const authority = `${request.protocol}://${request.hostname}:${process.env.PORT}`;
    const documentationLink = `${authority}/docs/how-to-handle-authorization.html`;
    // implementing a custom error response on 403 errors matching the GitHub error response format
    response.status(statusCode).json({
      message: message,
      documentationLink: documentationLink,
    });
    return;
  }
  const statusCode = error.statusCode || error.code || 500;
  const message = error.message || "internal error";
  response.status(statusCode).json({ message });
};
*/

// https://www.codepedia.org/ama/cleaner-code-in-expressjs-rest-api-with-custom-error-handling
