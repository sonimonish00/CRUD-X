import { queryListOfUsers } from "../services/user.services.js";

const getAllUsers = (req, res) => {
  try {
    const userList = queryListOfUsers();
    return res.status(200).json(userList);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export { getAllUsers };
