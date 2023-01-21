// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/services/user.service.js
// import { User, userValidationSchema } from "../models/user.model.js";
import { User } from "../models/user.model.js";
import { Api404Error } from "../utils/customErrors.js";

const createNewUser = async (req, res) => {
  // const data = {
  // snake_case (All other Lang) : req.body.camelCase (JS/C#/Java)
  //   first_name: req.body.firstName,
  //   last_name: req.body.lastName,
  // };
  const { firstName, lastName } = req.body;
  /*
  if (!firstName || !lastName) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields: F/L names'
    });
  } */
  const user = new User({
    first_name: firstName,
    last_name: lastName,
  });
  return await user.save();
};

/**
 * Helper/Model Fn (Service) -> Queries DB for all users.
 *
 * @async
 * @function queryListOfUsers
 * @alias queryListOfUsers
 * @returns {Promise<Array>} Promise that resolves to an array of users.
 * @throws {Error} If any error while querying the database.
 */
const queryListOfUsers = async () => {
  return await User.find({});
  // const err = new Api404Error("Testing 404 Error here");
  // err.source = "user.service.js => queryListOfUsers()";
  // throw err;
};

export { createNewUser, queryListOfUsers };
// const queryUserByID = (userID) =>{... read/GET Specific logic}

// const updateUserByID = (userID) =>{... update/PUT logic}
// const deleteUserByID = (userID) =>{... del/DEL logic}
