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
 * @function getAllUsers
 * @param {object} req
 * @param {object} res
 * @returns
 */
const getAllUsers = async (req, res) => {
  try {
    const userList = await queryListOfUsers(req, res);
    return res.status(200).json(userList);
  } catch (error) {
    return res.status(400).send(error);
  }
};
// const getUser = (req, res) => {
//   const userID = req.params.id;
//   const user = queryUserByID(userID);
// };
// const updateUser = (req, res) => {...updateUserByID(userID)};
// const DeleteUser = (req, res) => {...deleteUserByID(userID)};
export { addUser, getAllUsers };

// https://github.com/RootSoft/API-Naming-Convention#http-status-codes

// https://www.bigbinary.com/books/learn-qa-automation-using-cypress/js-and-file-naming-conventions#function-arguments-conventions
