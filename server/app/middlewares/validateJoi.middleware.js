// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/middlewares/validate.js
import Joi from "@hapi/joi";
import { ApiError } from "../utils/customErrors.js";
import { httpStatusCodes } from "../utils/httpStatusCodes.js";

const validate = (schema) => (req, res, next) => {
  const validSchema = {};
  if (schema.params) {
    validSchema.params = schema.params;
  }
  if (schema.query) {
    validSchema.query = schema.query;
  }
  if (schema.body) {
    validSchema.body = schema.body;
  }
  const object = {};
  if (validSchema.params) {
    object.params = req.params;
  }
  if (validSchema.query) {
    object.query = req.query;
  }
  if (validSchema.body) {
    object.body = req.body;
  }
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatusCodes.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export { validate };
