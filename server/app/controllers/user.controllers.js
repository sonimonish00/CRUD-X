import { queryListOfUsers } from "../services/user.services.js";

const getAllUsers = (req, res) => {
  const userList = queryListOfUsers();
  return res.status(200).json(userList);
};

export { getAllUsers };
