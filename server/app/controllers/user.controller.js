/**
 * @author Monish Soni
 * @copyright Monish
 * @summary `User` controller module for CRUD Ops
 * @version 1.0.0
 * @todo: CRUD tasks
 */

import { createNewUser, queryListOfUsers } from "../services/user.service.js";
import { Api404Error } from "../util/errors/customErrors.js";

// CREATE (POST) : Creates a new user.
const addUser = async (req, res) => {
  try {
    const result = await createNewUser(req, res);
    console.log(result);
    return res.status(201).send("New User Created!!");
  } catch (error) {
    return res.status(500).send(error);
  }
};

/**
 * READ (GET) - Fetch all users list.
 *
 * @async
 * @function getAllUsers
 * @see queryListOfUsers
 * @route GET /users
 * @param {Object} req - The incoming HTTP request object.
 * @param {Object} res - The outgoing HTTP response object.
 * @returns {Object} - HTTP response object with users list or error message.
 * @description Retrieves & return all users from DB.
 * @access public
 */
const getAllUsers = async (req, res, next) => {
  // [TODO] : Instead of try/catch make a wrapper fn in `utils/tryCatchAsync.helper.js` & import and use it.
  try {
    const users = await queryListOfUsers(); // Retrieve all users by calling `model/service fn`

    // Operational Err. (Client) : URL Validation (Broken/Dead link) -> successful req., but empty resource
    // [TODO] : handle centrally in express middleware -> return next(new API404Error("No users found!!")) => using `throw` we throw custom errors which will be catched by `catch` block as custom error object i.e we check (if condition) for ops error and throw custom error
    if (isArrayEmpty(users))
      return res.status(404).json({ error: "No users found!!" });

    // Success (200) : send all users list
    return res.status(200).json(users);
  } catch (error) {
    // ALL BELOW CODE SHOULD BE DELGATED TO error handler MIddleware via next(err) do the if-check there not here
    // ******************************************************************************************************
    // Operational Error : 400 (Client bad req.) & 500 (Default internal server)
    // Demo code - After importing from customErrors.js => return next(new customErrors)
    if (error instanceof SyntaxError) {
      console.log("Invalid data: " + error.message); // Invalid data: No field: name - 400
    } else if (error instanceof Api404Error) {
      console.log("==> Custom Error Successfully working");
      console.log("API 404 Error: " + error.message);
      console.log("API 404 Error: " + error.source);
      res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stack: error.stack,
      });
      // RECOMMENDED (re-throw it to errorMiddleware) : next(new Api404Error("404 Err - Res. Not found"));
    } else {
      next(error); // All rest unknown errors shall be passed to middleware to log res(500) there
      // BETTER TO USE (RECOMMENDED) : return next(error);
      // FYI : u could pass next() just as it is without error obj as arg. to handle default in middleware
    }
    // ******************************************************************************************************
  }
};

// Helper Fn. (Utils) : Array emptiness check i.e no users
function isArrayEmpty(users) {
  return !users?.length;
}

export { addUser, getAllUsers };

// const getUserByID = async (req, res) => {
//   const userID = req.params.id;
//   const user = queryUserByID(userID);
//   if(!user) error
// };
// OR
// const getUserByID = async (req, res) => {
//   // retrieve the user ID from the request parameters
//   const userId = req.params.id;
//   try {
//     // find the user in the database by ID
//     const user = await User.findById(userId);
//     // send the user as the response (JSON)
//     return res.status(200).json(user);
//   } catch (error) {
//     // if there was an error, send a server error response
//     return res.status(500).send(error);
//   }
// };
// OR
// const getUserByID = async (req, res) => {
//   try {
//     // retrieve the user from the database using the user ID from the request
//     const user = await User.findById(req.params.id);
//     // send the user as the response (JSON)
//     return res.status(200).json(user);
//   } catch (error) {
//     // if there was an error, send a bad request response with the error message
//     return res.status(400).send(error);
//   }
// };

// const updateUser = (req, res) => {...updateUserByID(userID)};
// const DeleteUser = (req, res) => {...deleteUserByID(userID)};
