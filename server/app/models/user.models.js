// DB Name (MongoDB Atlas) : CRUDX
// Model (Table/Collection) : `Users`

import { Schema, model } from "mongoose";
const userSchema = new Schema({
  firstName: {
    type: String,
    default: "Monish",
  },
  marks: {
    type: Number,
    default: 100,
  },
});
const UserModel = model("Users", userSchema);
export { UserModel };

// let USER_FAKE_DATA = [
//   {
//     id: 1,
//     name: "User 1",
//     email: "email@email.com",
//     password: "password",
//     role: "admin",
//     status: "active",
//   },
//   {
//     id: 2,
//     name: "User 2",
//     email: "email@email.com",
//     password: "password",
//     role: "user",
//     status: "active",
//   },
// ];
// export { USER_FAKE_DATA };
