// Util : async wrapper/handler/helper fn to replace try-catch block

// Approach 1 : try-catch with async/await [Recommended]
const asyncWrapTC = (controllerHandlerCallback) => async (req, res, next) => {
  try {
    return await controllerHandlerCallback(req, res);
  } catch (error) {
    return next(error);
  }
};

export { asyncWrapTC };

/* Reference Links, Code & Info
  // Approach 2 : Using Promises
    const asyncPromiseWrap = (controllerHandlerCallback) => (req, res, next) => {
      Promise.resolve(controllerHandlerCallback(req, res, next))
        .then((res) =>
          res.status(res.statusCode).send({
            data: res.data,
          })
          )
          .catch((err) => next(err));
        };
  // Approach 3 : 
    - try/catch Alternative -> https://www.npmjs.com/package/@awaitjs/express
    - try/catch Alternative -> https://www.npmjs.com/package/express-async-handler
    - try/catch Alternative (Easiest) -> https://www.npmjs.com/package/express-async-errors
  
  // HTTP Status Code Alternative -> https://www.npmjs.com/package/http-errors
    - Eg. const createError = require('http-errors') => cud pass to middleware via next(createError(400)) also.
*/
