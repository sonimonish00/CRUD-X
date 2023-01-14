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
  // async always returns a promise so either use .then()/.catch() OR await to resolve promise
  // ALT : to avoid try/catch u cud make ur own catchAsync() wrapper fn. in separate file in `utils`
  // ALT : to avoid try/catch u cud use -> https://www.npmjs.com/package/@awaitjs/express
  // ALT : to avoid try/catch u cud use -> https://www.npmjs.com/package/express-async-handler
  // ALT : Easiest way to avoid try/cath -> https://www.npmjs.com/package/express-async-errors
  // ALT (HTTP Status Code) : U cud use -> https://www.npmjs.com/package/http-errors
  // Eg. const createError = require('http-errors'); => u cud pass to middleware via next(createError(400)) also.
  // app.put( "/testing", asyncHandler(async (req, res) => {
  //     const { email } = req.body; const user = await User.findOne({ email });
  //     if (!user) throw createError(400, `User '${email}' not found`);
  //   }));
  try {
    const users = await queryListOfUsers(); // Retrieve all users by calling `model/service fn`

    // Operational Err. (Client) : URL Validation (Broken/Dead link) -> successful req., but empty resource
    // TODO : Will do next(throw new API404Error) here
    if (isArrayEmpty(users))
      return res.status(404).json({ error: "No users found!!" });

    // ONLY THIS BELOW LOC will be intact
    return res.status(200).json(users); // Success (200) : send all users list
  } catch (error) {
    // Operational Error : 400 (Client bad req.) & 500 (Default internal server)
    // 400 : A status code of 400 indicates that the server did not understand the request due to bad syntax. server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing).
    // 400 Data Validtn. -> Insufficient/Invalid/Missing data input or Bad Syntax or incorrect Method (GET/POST)
    // Eg. - [{blah:"Roman"}] where blah field doesnt exist
    // Eg. - [{reqRes:"Roman"}] where reqRes field exists but "Roman" is invalid value for this field
    // Eg. - Invalid password, Insufficient input (eg when either username or pswd is missing)
    // A 500 status code (which developers see more often that they want) indicates that the server encountered something it didn't expect and was unable to complete the request.

    // Demo code - After importing from customErrors.js
    if (error instanceof SyntaxError) {
      console.log("Invalid data: " + error.message); // Invalid data: No field: name - 400
    } else if (error instanceof Api404Error) {
      console.log("==> Custom Error Successfully working");
      console.log("API 404 Error: " + error.message);
      console.log("API 404 Error: " + error.source);
      // u can pass to middleware via next(error) but its of no use instead give response like something below
      res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stack: error.stack,
      });
    } else {
      next(error); // All rest unknown errors shall be passed to middleware to log res(500) there
      // BETTER TO USE return next(error);
    }

    // return res.status(500).json({ error: error.message });
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
