// [NO IMPROVMENT NEEDED FOR TOKEN BASED AUTH]
/**
 * @author Monish Soni
 * @copyright Monish
 * @summary `User` controller module for CRUD Ops
 * @version 1.0.0
 * @todo: CRUD tasks GET/POST/PUT/DELETE
 */

import { httpStatusCodes } from "../utils/httpStatusCodes.js";
import { ApiError } from "../utils/customErrors.js";
import { asyncWrapTC } from "../utils/tryCatchAsync.helper.js";
import * as userService from "../services/user.service.js";

// [TODO] : https://github.com/hagopj13/node-express-boilerplate/blob/master/src/controllers/user.controller.js
//    POST (Create) : 201 created [Erros - 400]
//    GET (Read All) : 200 success/ok [Errors - 404]
//    GET (Read byID) : 200 success/ok [Errors - 404]
//    PUT (Update) : 200,201,204 (Recommended 204) [Errors - 404,400]
//    DELETE (delete) : 200,204 (Recommended 204) [Errors - 404]

// CREATE (POST) : Creates a new user.
const createUser = asyncWrapTC(async (req, res) => {
  // [TODO] : convert below response to JSON & remove `result` variable if not of use anymore.
  const result = await userService.addUser(req, res);
  return res.status(httpStatusCodes.CREATED).send("New User Created!!");
});

/**
 * READ (GET) - Fetch all users list.
 *
 * @async
 * @function getUsers
 * @see queryUsers
 * @route GET /users
 * @param {Object} req - The incoming HTTP request object.
 * @param {Object} res - The outgoing HTTP response object.
 * @returns {Object} - HTTP response object with users list or error message.
 * @description Retrieves & return all users from DB.
 * @access public
 */
const getUsers = asyncWrapTC(async (req, res, next) => {
  const users = await userService.queryUsers(); // Retrieve all users by calling `model/service fn`

  // Ops Err : req. success, but empty resource -> 404 Not Found
  if (isArrayEmpty(users)) {
    throw new ApiError(httpStatusCodes.NOT_FOUND, "No User Found !!");
  }
  return res.status(200).json(users); // Success (200) : send all users list
});

// Helper Fn. (Utils) : Array emptiness check i.e no users
function isArrayEmpty(users) {
  return !users?.length;
}
// <============ Not sure below one's will works or not. just included here ============>
const getUser = asyncWrapTC(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatusCodes.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = asyncWrapTC(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = asyncWrapTC(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatusCodes.NO_CONTENT).send();
});
// <============ ENDS HERE ============>

export { createUser, getUsers, getUser, updateUser, deleteUser };
// ALT : const userController = { createUser, getUsers } and then export { userController }

/* Extra Code 
    const getUser = async (req, res) => {
      const userID = req.params.id;
      const user = getUserById(userID);
      if(!user) error
    };
    OR
    const getUserByID = async (req, res) => {
      // retrieve the user ID from the request parameters
      const userId = req.params.id;
      try {
        // find the user in the database by ID
        const user = await User.findById(userId);
        // send the user as the response (JSON)
        return res.status(200).json(user);
      } catch (error) {
        // if there was an error, send a server error response
        return res.status(500).send(error);
      }
    };
    OR
    const getUserByID = async (req, res) => {
      try {
        // retrieve the user from the database using the user ID from the request
        const user = await User.findById(req.params.id);
        // send the user as the response (JSON)
        return res.status(200).json(user);
      } catch (error) {
        // if there was an error, send a bad request response with the error message
        return res.status(400).send(error);
      }
    };

    const updateUser = (req, res) => {...updateUserByID(userID)};
    const DeleteUser = (req, res) => {...deleteUserByID(userID)};

 */
