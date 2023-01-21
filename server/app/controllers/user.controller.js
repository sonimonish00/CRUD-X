/**
 * @author Monish Soni
 * @copyright Monish
 * @summary `User` controller module for CRUD Ops
 * @version 1.0.0
 * @todo: CRUD tasks GET/POST/PUT/DELETE
 */

import { createNewUser, queryListOfUsers } from "../services/user.service.js";
import { Api404Error } from "../utils/customErrors.js";
import { tryCatchAsync } from "../utils/tryCatchAsync.helper.js";

// [TODO] : Refactor https://github.com/hagopj13/node-express-boilerplate/blob/master/src/controllers/user.controller.js
// CREATE (POST) : Creates a new user.
// [TODO] : Status codes -> 201, 400, 404, 500
const addUser = tryCatchAsync(async (req, res) => {
  const result = await createNewUser(req, res);
  // [TODO] : convert below response to JSON
  return res.status(201).send("New User Created!!");
});

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
const getAllUsers = tryCatchAsync(async (req, res, next) => {
  // Retrieve all users by calling `model/service fn`
  const users = await queryListOfUsers();

  // Operational Err : req. success, but empty resource -> 404 Not Found
  if (isArrayEmpty(users)) {
    const err = new Api404Error("No User Found !!!!");
    err.source = "user.contoller.js => getAllUser()";
    err.data = err;
    throw err;
  }
  return res.status(200).json(users); // Success (200) : send all users list
});

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
