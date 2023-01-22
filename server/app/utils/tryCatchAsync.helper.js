// Util : async wrapper/handler/helper fn to replace try-catch block

// Using try-catch approach with async/await [Recommended]
const asyncWrapTC = (controllerHandlerCallback) => async (req, res, next) => {
  try {
    await controllerHandlerCallback(req, res);
  } catch (error) {
    return next(error);
  }
};

export { asyncWrapTC };

// Alternative : Using Promise
/*
const asyncPromiseWrap = (controllerHandlerCallback) => (req, res, next) => {
  Promise.resolve(controllerHandlerCallback(req, res, next))
    .then((res) =>
      res.status(res.statusCode).send({
        data: res.data,
      })
    )
    .catch((err) => next(err));
};
*/

/*
  Reference Links : 
    - try/catch Alternative -> https://www.npmjs.com/package/@awaitjs/express
    - try/catch Alternative -> https://www.npmjs.com/package/express-async-handler
    - try/catch Alternative (Easiest) -> https://www.npmjs.com/package/express-async-errors
    - HTTP Status Code Alternative -> https://www.npmjs.com/package/http-errors
        - Eg. const createError = require('http-errors') => cud pass to middleware via next(createError(400)) also.
*/
