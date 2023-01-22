// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/services/user.service.js
// import { User, userValidationSchema } from "../models/user.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/customErrors.js";
import { httpStatusCodes } from "../utils/httpStatusCodes.js";

const addUser = async (req, res) => {
  // const data = {
  // snake_case (All other Lang) : req.body.camelCase (JS/C#/Java)
  //   first_name: req.body.firstName,
  //   last_name: req.body.lastName,
  // };
  const { firstName, lastName } = req.body;

  // Custom Data Validation at service layer
  if (!firstName || !lastName) {
    throw new ApiError(
      httpStatusCodes.BAD_REQUEST,
      "Both first and last name are required !!"
    );
  }
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
 * @function queryUsers
 * @alias queryUsers
 * @returns {Promise<Array>} Promise that resolves to an array of users.
 * @throws {Error} If any error while querying the database.
 */
const queryUsers = async () => {
  return await User.find({});
};

export { addUser, queryUsers };

// const getUserById = (userID) =>{... read/GET Specific logic}
// const updateUserByID = (userID) =>{... update/PUT logic}
// const deleteUserByID = (userID) =>{... del/DEL logic}
