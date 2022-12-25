// NOTE : Service === Helper => Benefit of creating controller -> service -> DB is that CRUD fn. logic cud be reused anywhere in the application.eg. getUserByID cud just call this Fn. from user.service.js. Kind of HELPER method. Helper is for General Methods like calculateDate.js etc. and Service is for DB Specific methods like getUSerByID, updateUserbyID etc.
// NOTE : Only downside is for Mult-DB Arch. separate service files needed to be created.

// import { User, userValidationSchema } from "../models/user.model.js";
import { User } from "../models/user.model.js";

const createNewUser = async (req, res) => {
  try {
    // Creating doc/row (instance of `User` model)
    // Field name (body.XXX) : camelCase (JS/C#/Java - used here) vs. snake_case (Py/ruby etc - recommended).
    // [BUG] : if firstName/lastName are not defined then either pass empty string OR have validation that names are req. OR have validation `unique` in mongoose schema itself. YOU COULD HAVE A SEPARATE VALIDATION FOLDER FROM WHERE YOU CAN IMPORT IT HERE TO CHECK THE DATA YOU ARE GETTING IS CORRECT. KIND OF MIDDLEWARE ONLY DIFF IS THAT MIDDLEWARE IS VALIDATION B/W REQ/RES Cycle like Auth, loggin etc. while this is more of data validation.
    //Video - https://youtu.be/Dco1gzVZKVk?t=835
    // const data = {
    //   first_name: req.body.firstName,
    //   last_name: req.body.lastName,
    // };
    const { firstName, lastName } = req.body;
    const user = new User({
      first_name: firstName,
      last_name: lastName,
    });

    // .save() -> instance method ie. user.save()
    // .create() -> called on model ie. User.create()
    // .insertOne/Many() -> User.collection.insertOne() => Not recommended, use save/create as validator only runs on them, i prefer save as it can be use to update as well.
    await user.save();
    return;
  } catch (error) {
    console.error("Error : ", err.message);
  }
};

/**
 * Queries database for list of users.
 *
 * @async
 * @function queryListOfUsers
 * @alias queryListOfUsers
 * @returns {Promise<Array>} Promise that resolves to an array of users.
 * @throws {Error} If any error while querying the database.
 */
const queryListOfUsers = async () => {
  try {
    return await User.find({});
  } catch (error) {
    // Error thrown to be handled by calling fn. (controller)
    throw error;
  }
};

// const queryUserByID = (userID) =>{... read logic}
// const updateUserByID = (userID) =>{... update logic}
// const deleteUserByID = (userID) =>{... del logic}
export { createNewUser, queryListOfUsers };

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#using_models
// https://javascript.plainenglish.io/connect-mongodb-to-node-using-express-and-mongoose-c405d1158c
// https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
