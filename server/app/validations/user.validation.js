// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/validations/user.validation.js
// using Joi library
import Joi from "@hapi/joi";

// CREATE - validate for creating new user
const addUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export { addUser };

// [TODO] : For rest of CRUD Ops - add, read, edit, delete
