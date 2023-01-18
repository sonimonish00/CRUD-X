// Custom Error Module : extending built-in error classes (Error, SyntaxError, ReferenceError, RangeError, TypeError, URIError, EvalError etc.)
// Example of Custom Errors (User-defined) : BaseError, HttpError, DBError, NotFoundError, API404Error etc.
// Heirarchy :
//      Error -> MyError, ReadError, BaseError
//                                   BaseError -> DBError, NotFound400Error, HTTPError
//      SyntaxError -> API404Error
//      MyError -> ValidationError -> PropertyRequiredError
// ApplicationError : ancestor of all other error classes i.e all other error classes inherits from it.
// DatabaseError : Any error relating to Database operations will inherit from this class.
// UserFacingError : Any error produced as a result of a user interacting with the application.

// sematext.com code https://sematext.com/blog/node-js-error-handling STARTS ================
const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

// REFER THIS : https://gist.github.com/kluu1/e2a37b40c59d255456327a4e8ec33738#file-errors-js
class BaseError extends Error {
  // constructor -> special method for creating and initializing an object created from a class.
  constructor(message, statusCode, isOperational) {
    // super ->  calls the constructor method of the parent class `Error` & gets access of its prop,methods
    // 'Error' breaks prototype chain here
    super(message);
    //  We restore prototype chain here, by setting prototype of `this` to prototype of `new.target`. `BaseError` ensures that proto. chain of object being constructed is correct, bcz by default it's set to `BaseError.prototype`, instead of CF prototype.
    // Eg. MyErr extends BaseError; e = new MyErr("Hi"); Object.getPrototypeOf(e) === MyErr.prototype => true
    // W/o call to `Object.setPrototypeOf`, prototype of `e` wud be set to `BaseError.prototype` instead of `MyError.prototype`.
    // Evolution : __proto__ => .setPrototypeOf() OR .create()
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name; //more concise, less error-prone & name of class cud be easily chnged
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

// 400 Bad Request Error
class BadRequest400Error extends BaseError {
  constructor(
    message = "Bad request : invalid url, malformed request syntax, invalid request message framing",
    statusCode = httpStatusCodes.BAD_REQUEST,
    isOperational = true
  ) {
    super(message, statusCode, isOperational);
  }
}

// 404 Not Found Error
// Also refer - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/utils/ApiError.js
class Api404Error extends BaseError {
  constructor(
    message = "Default Dali huyi Error",
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true
  ) {
    super(message, statusCode, isOperational);
  }
}

// PENDING - 403ForbiddenError, 500InternalServerError
export { BaseError, BadRequest400Error, Api404Error };

// sematext.com code ENDS ================

/* MOHAMAD FAISAL CODE
https://javascript.plainenglish.io/error-handling-in-node-js-like-a-pro-ed210baa0600
https://github.com/Mohammad-Faisal/nodejs-expressjs-error-handling
https://github.com/Mohammad-Faisal/professional-express-sequelize-docker-boilerplate
https://github.com/tlaanemaa/http-error-classes

import { StatusCodes } from 'http-status-codes'; //NPM Package

export class ApiError extends Error {
    constructor(statusCode, message, rawErrors) {
        super(message);
        this.rawErrors = [];
        this.statusCode = statusCode;
        if (rawErrors)
            this.rawErrors = rawErrors;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class NotFoundError extends ApiError {
    constructor(path) {
        super(StatusCodes.NOT_FOUND, `The requested path ${path} not found!`);
    }
}
export class BadRequestError extends ApiError {
    constructor(message, errors) {
        super(StatusCodes.BAD_REQUEST, message, errors);
    }
}
*/

/*
// javascript.info code STARTS ================
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ReadError";
  }
}
class ValidationError extends MyError {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}
// javascript.info code ENDS ================
*/

// EXAMPLE USAGE ===> Javascript.info CODE
// function validateInput(input) {
//   if (!input) {
//     throw new ValidationError1("Only truthy inputs allowed", input);
//   }
//   return input;
// }
// try {
//   validateInput(userJson);
// } catch (err) {
//   if (err instanceof ValidationError1) {
//     console.error(`Validation error: ${err.message}, caused by: ${err.cause}`);
//     return;
//   }
//   console.error(`Other error: ${err.message}`);
// }

/*
function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;
  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }
  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }
}

try {
  readUser("{bad json}");
} catch (e) {
  if (e instanceof ReadError) {
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
  } else {
    throw e;
  }
}
*/

// EXTRA CODE
/* 
class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // name is set to the name of the class
  }
}
class ValidationError1 extends ApplicationError {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
  }
}
class DBError extends BaseError {}
class NotFound400Error extends BaseError {}
class HTTPError extends BaseError {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
*/
