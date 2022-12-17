import { UserModel } from "../models/user.models.js";
const queryListOfUsers = () => {
  const user = new UserModel({
    firstName: "Monish Soni ",
    marks: 200,
  });
  return user.firstName + user.marks;
};

export { queryListOfUsers };
