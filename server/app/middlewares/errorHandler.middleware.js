// Middleware (Express) : central error handling [Customized]
import { logger } from "../config/logger.js";
import { BaseError, ApiError } from "../utils/customErrors.js";
import { httpStatusCodes } from "../utils/httpStatusCodes.js";
import { mongoose } from "mongoose";
import config from "../config/config.js";

class ErrorHandler {
  // Operational errors (index.js -> Express app) [4xx, 5xx]
  static handle = () => {
    return async (err, req, res, next) => {
      // 1. Pre-processing : Converts err to APIError (mongoose Err & 500 ISE are Programmer err hence flag is false)
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
  static initializeUnhandledException = (server) => {
    process.on("unhandledRejection", (reason, promise) => {
      logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
      exitHandler(server);
    });

    process.on("uncaughtException", (error) => {
      logger.error(`Uncaught Exception: ${error}`);
      if (!isOperationalErr(error)) {
        exitHandler(server);
      }
      // If graceful shutdown is not achieved after 1 sec, shutdown process completely, exit immediately and generate a core dump file
      setTimeout(() => {
        process.abort();
      }, 1000).unref();
    });
  };
}

// Helper fn -> If error is not ops i.e programmer err then return `false`
function isOperationalErr(error) {
  return error instanceof BaseError ? error.isOperational : false;
}

// Helper fn -> Checks if server is closed or not then exit
const exitHandler = (server) => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

export { ErrorHandler };

/* Reference Links, Code & Info
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/middlewares/error.js
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/app.js
  - https://gist.github.com/kluu1/40b52b60a34676f00092685a43dfbecd#file-handleerrors-js
  - https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/centralizedhandling.md
*/

/* [TODO] : JSON Schema (Libraries : joi, validator, ajv, jsonschema etc.)
   - https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/validation.md
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
