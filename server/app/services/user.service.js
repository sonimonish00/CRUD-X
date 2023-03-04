import { httpStatusCodes } from "../utils/httpStatusCodes.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/customErrors.js";

/**
 * Helper/Model Fn (Service) -> Creates or Register a new user
 *
 * @async
 * @function addUser
 * @alias addUser
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<Object>} The newly created user object.
 * @throws {ApiError} If the email is already taken.
 */
const addUser = async (req, res) => {
  const { firstName, lastName, emailID, password } = req.body;

  if (await User.isEmailTaken(emailID)) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Email-ID already taken");
  }
  const user = new User({
    first_name: firstName,
    last_name: lastName,
    email_id: emailID,
    password: password,
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

/**
 * Get user by email
 * @param {string} email_id
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email_id) => {
  return User.findOne({ email_id });
};

// <============ Not sure below one's will works or not. just included here ============>
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatusCodes.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatusCodes.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};
// <============ ENDS HERE ============>

export {
  addUser,
  queryUsers,
  getUserByEmail,
  getUserById,
  updateUserById,
  deleteUserById,
};

/* Reference Links, Code & Info
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/services/user.service.js
  1. const data = {
        snake_case (All other Lang) : req.body.camelCase (JS/C#/Java)
        first_name: req.body.firstName,
        last_name: req.body.lastName,
      };

  2. Custom Data Validation at service layer
    if (!firstName || !lastName || !emailID || !password) {
      throw new ApiError(httpStatusCodes.BAD_REQUEST, "All fields are required : first name, last name, password & email ID !!");
    }
*/
