// Util : Helper/Wrapper Fn to replace try/catch block in async/await fn. i.e a Async Wrapper Function

/* Usage :
    tryCatchAsync(async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw createError(400, `User '${email}' not found`); // see Http-errors npm below
    })
*/
const tryCatchAsync = async () => {};

export { tryCatchAsync };

/* Way 1
    const tryCatchAsync = (handler) => (req, res, next) => {
        Promise.resolve(handler(req, res, next)).then(
        (response) => res.status(response.statusCode).send({
            data: response.data,
        }))
            .catch((err) => next(err));
    };
*/

/* Way 2
    const tryCatchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
*/

/* Way 3 - See the BEST Video 1st in list

 */

/*
  Reference Links : 
    - try/catch Alternative -> https://www.npmjs.com/package/@awaitjs/express
    - try/catch Alternative -> https://www.npmjs.com/package/express-async-handler
    - try/catch Alternative (Easiest) -> https://www.npmjs.com/package/express-async-errors
    - HTTP Status Code Alternative -> https://www.npmjs.com/package/http-errors
        - Eg. const createError = require('http-errors') => cud pass to middleware via next(createError(400)) also.
*/
