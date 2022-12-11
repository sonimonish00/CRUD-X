import { queryListOfUsers } from "../services/user.services.js";

const getAllUsers = (req, res) => {
  const userList = queryListOfUsers();
  return res.json(userList);
};

export { getAllUsers };
