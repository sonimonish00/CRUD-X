// import { User, userValidationSchema } from "../models/user.model.js";
import { User } from "../models/user.model.js";
import { Api404Error } from "../util/errors/customErrors.js";

const createNewUser = async (req, res) => {
  // const data = {
  // snake_case (All other Lang) : req.body.camelCase (JS/C#/Java)
  //   first_name: req.body.firstName,
  //   last_name: req.body.lastName,
  // };
  const { firstName, lastName } = req.body;
  /*
  if (!firstName || !lastName) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields: F/L names'
    });
  } */
  const user = new User({
    first_name: firstName,
    last_name: lastName,
  });
  try {
    return await user.save();
  } catch (error) {
    console.error("Error : ", error.message);
    throw error;
  }
};

/**
 * Helper/Model Fn (Service) -> Queries DB for all users.
 *
 * @async
 * @function queryListOfUsers
 * @alias queryListOfUsers
 * @returns {Promise<Array>} Promise that resolves to an array of users.
 * @throws {Error} If any error while querying the database.
 */
const queryListOfUsers = async () => {
  // async always returns a promise so either use .then()/.catch() OR await to resolve promise
  try {
    return await User.find({});
    // throw new Error("Testing for Middleware success");
    // throw new Api404Error("Meri khudki custom error ko test kar rha hu !!");
  } catch (error) {
    // Re-throw to calling fn. (i.e. controller) by customizing built-in error (Optional)
    error.source = "user.service.js => queryListOfUsers()";
    throw error;
  }
};

export { createNewUser, queryListOfUsers };
// const queryUserByID = (userID) =>{... read/GET Specific logic}

// const updateUserByID = (userID) =>{... update/PUT logic}
// const deleteUserByID = (userID) =>{... del/DEL logic}
