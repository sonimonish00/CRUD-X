// Custom Errors Module : extending built-in error classes

// Base Error : foundation for all `Operational errors` like API Errors, Data validation, DB & NW Err etc.
class BaseError extends Error {
  constructor(statusCode, message, isOperational = true, stack = "") {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); //Optional
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // Easily readadble stack-trace
    }
  }
}

// Extending specifically for API errors : 400, 404, 500 etc.
class ApiError extends BaseError {}

export { BaseError, ApiError };

/* Extra code 
  import { httpStatusCodes } from "./httpStatusCodes.js";

  // Application Error could further extends subclasses, similarly for DB error, NW errors etc.
  class ApplicationError extends BaseError{
    constructor(
    statusCode = httpStatusCodes.BAD_REQUEST || customCode.erroCode,
    message = "Something happened in application layer",
    isOperational = true
    ){
      super(statusCode,message,isOperational)
    }
  }
*/
