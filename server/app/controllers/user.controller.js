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
 * READ (GET) : Get all users list.
 *
 * @function fetchUserList
 * @param {Object} req - The incoming HTTP request object
 * @param {Object} res - The outgoing HTTP response object
 * @returns {Object} - The HTTP response object with the list of users or an error message
 * @description - `fetchUserList` (controller fn) calls `queryListOfUsers` (model/service fn) to retrieve a list of users from the DB & send it as HTTP response (JSON format)
 * @access Public
 */
const fetchUserList = async (req, res) => {
  try {
    // calls `model/service fn` to retrieve list of users from DB
    const users = await queryListOfUsers(req, res);
    // if users aren't found, send client error `404 Resource not found` in response
    // This allows the client to understand that the request was successful, but that no matching data was found in the database.
    if (users === null || !users) {
      return res.status(404).json({ error: "Empty DB => No users found!!" });
    }
    // send the list of users as the response (JSON) => ie. All good
    return res.status(200).json(users);
  } catch (error) {
    // if there was DB conn error, send `500 internal server` err response with msg
    if (error.name === "MongoError" || error.name === "DBError") {
      return res.status(500).json({ error: error.message || error.toString() });
    }
    // if there was different error, send `400 bad request` response with error msg.
    return res.status(400).json({ error: error.message || error.toString() });
  }
};

// Alternative Way of GET : using .then() & .catch()
// const fetchUserList1 = (req, res) =>
//   queryListOfUsers(req, res)
//     .then((users) => res.status(200).json(users))
//     .catch((error) => res.status(400).send(error));

// Alternative Way of GET : using .catch() only
// const fetchUserList2 = async (req, res) => {
//   const users = await queryListOfUsers().catch((error) => {
//     return res.status(400).send(error);
//   });
//   return res.status(200).json(users);
// };

export { addUser, fetchUserList };

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
/**
 * @function fetchUser
 * @param {Object} req - The incoming HTTP request object
 * @param {Object} res - The outgoing HTTP response object
 * @returns {Object} - The HTTP response object with a user or an error message
 *
 * @description A function to retrieve a user from the database and send it as the HTTP response (JSON)
 * @access Public
 */
// const fetchUser = async (req, res) => {
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
