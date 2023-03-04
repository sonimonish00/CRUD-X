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

// CREATE (POST) : Creates a new user.
const createUser = asyncWrapTC(async (req, res) => {
  await userService.addUser(req, res);
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
  // Retrieve all users by calling `model/service fn`
  const users = await userService.queryUsers();

  // Ops Err : req. success, but empty resource -> 404 Not Found
  if (isArrayEmpty(users)) {
    throw new ApiError(httpStatusCodes.NOT_FOUND, "No User Found !!");
  }

  // Success (200) : send all users list
  return res.status(200).json(users);
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

/* Reference Links, Code & Info
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/controllers/user.controller.js
  - CRUD Ops
    POST (Create) : 201 created [Erros - 400]
    GET (Read All) : 200 success/ok [Errors - 404]
    GET (Read byID) : 200 success/ok [Errors - 404]
    PUT (Update) : 200,201,204 (Recommended 204) [Errors - 404,400]
    DELETE (delete) : 200,204 (Recommended 204) [Errors - 404]
*/
