// Middleware (Express) : central error handling [Customized]

import { BaseError } from "../utils/customErrors.js";

// Could be divded into 2 parts errorConverter -> errorHandler
// see : https://github.com/hagopj13/node-express-boilerplate/blob/master/src/middlewares/error.js
// see : https://github.com/hagopj13/node-express-boilerplate/blob/master/src/app.js
// also : https://gist.github.com/kluu1/40b52b60a34676f00092685a43dfbecd#file-handleerrors-js
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/centralizedhandling.md
// [TODO] : Check if error is ops or not. If it is ops, Handle error(logging,mailing,APM) else restart (PM2)
class ErrorHandler {
  // Operational errors (index.js -> Express app) [4xx, 5xx]
  static handle = () => {
    return async (err, req, res, next) => {
      //  Stage 1. Pre-processing error : Sending error to APM loggin, email service, check error type, Req. validation (Joi) etc.
      // [TODO] : import APM Logging -> ./config/logger (winston) & ./config/morgan
      /*
      if (error instanceof ValidationError) {
        console.log("Validation Error (JOI): " + error.message);
      } else if (error instanceof BadRequest400Error) {
        console.log("==> Custom Error Successfully working");
        console.log("BadRequest400Error Error: " + error.source);
        return res.status(error.statusCode).json({
          status: error.statusCode,
          message: error.message,
          stack: error.stack,
        });
      } else {
        return res.status(500).send("Internal server default error")
      }
      */

      // Stage 2. Processing error : sending appropiate response format & customization of error
      if (!err.statusCode) err.statusCode = 500;
      console.log("==> Central Error Handling Middleware <==");
      console.log(err);
      const responseJSONSchema = {
        code: err.statusCode,
        message: err.message,
        stack: err.stack,
      };
      res.status(err.statusCode || 500).json(responseJSONSchema);
      /*
        JSON Schema (Libraries : joi, validator, ajv, jsonschema etc.). you can create a schema file that defines the structure of the JSON response and use a library such as ajv to validate the response against the schema.
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
    };
  };

  // Programmer errors (Server.js -> Express server)
  static initializeUnhandledException = () => {
    // globally handles `unhandled promise rejections`
    process.on("unhandledRejection", (reason, promise) => {
      console.log("==> Comes here at unhandled promise rejection");
      // https://www.honeybadger.io/blog/errors-nodejs/
      // Honeybadger.notify({
      //   message: "Unhandled promise rejection",
      //   params: {
      //     promise,
      //     reason,
      //   },
      // });
      console.error(reason);
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
      console.error(error);

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

// Helper fn -> If error is not operational i.e programmer err then exit gracefully
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
