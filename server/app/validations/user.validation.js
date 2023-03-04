import Joi from "@hapi/joi";
import { password, objectId } from "./custom.validation.js";

// CREATE [POST] - validate for creating new user (Register New User)
const addUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    emailID: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required().valid("user", "admin"),
  }),
};

// READ [GET] : Get list of all user
const queryUsers = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    emailID: Joi.string(),
    // password: Joi.string(),
    role: Joi.string(),
  }),
};

// <============ Not sure below one's will works or not. just included here ============>
const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      emailID: Joi.string().email(),
      password: Joi.string().custom(password),
      firstName: Joi.string(),
      lastName: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

// <============ ENDS HERE ============>

export { addUser, queryUsers, getUser, updateUser, deleteUser };

/* Reference Links, Code & Info [#User Module Related]
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/validations/user.validation.js
  - [TODO] : Validation for rest of CRUD Ops - add, read, edit, delete (I've included the code above but not sure about it, hence its pending TODO)
*/
