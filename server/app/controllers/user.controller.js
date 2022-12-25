/**
 * @author Monish Soni
 * @copyright Monish
 * @summary `User` controller module for CRUD Ops
 * @version 1.0.0
 * @todo: CRUD tasks
 */

import { createNewUser, queryListOfUsers } from "../services/user.service.js";

// CREATE (POST) : Creates a new user.
const addUser = async (req, res) => {
  try {
    await createNewUser(req, res);
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
 * @param {Object} req - The incoming HTTP request object.
 * @param {Object} res - The outgoing HTTP response object.
 * @returns {Object} - HTTP response object with users list or error message.
 * @description Retrieves & return all users from DB.
 */
const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users by calling `model/service fn`
    const users = await queryListOfUsers();

    // Data Validation (EC) : req. success, but empty resource
    if (!users?.length)
      return res.status(404).json({ error: "No users found!!" });

    // Success (200) : send all users list
    return res.status(200).json(users);
  } catch (error) {
    // If any error, handle it through central fn.
    return handleError(error, res);
  }
};

// Error Handling (400 & 500)
const handleError = (error, res) => {
  // Error check (EC) -> NW/DB (500)
  if (error.name === "MongoError") {
    return res.status(500).json({ error: error.message });
  }
  // EC (All Others) -> (400)
  return res.status(400).json({ error: error.message });
};

export { addUser, getAllUsers };

// const getUser = async (req, res) => {
//   const userID = req.params.id;
//   const user = queryUserByID(userID);
// };
// OR
// const getUser = async (req, res) => {
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
// const getUser = async (req, res) => {
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

// https://github.com/RootSoft/API-Naming-Convention#http-status-codes

// https://www.bigbinary.com/books/learn-qa-automation-using-cypress/js-and-file-naming-conventions#function-arguments-conventions
