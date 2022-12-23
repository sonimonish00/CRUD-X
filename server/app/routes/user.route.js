// DB : `crudxDB`
// Collection (Table) : `User`
// Route related err : https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#route_parameters

import express from "express";
import { addUser, fetchUserList } from "../controllers/user.controller.js";
const userRoutes = express.Router();

// Routes naming convention : leverage HTTP verbs/methods.

// CREATE : create user -> "/users" | Alternative : "/create"
// Eg. : /tickets/<id>/messages -> create new msg in ticket #id
userRoutes.post("/", addUser);

// READ : get all users -> "/users/"
userRoutes.get("/", fetchUserList);
// READ : get particular user with `id` -> "/users/:id"
// Eg. : /tickets/12/messages/5 -> get message #5 for ticket #12
// userRoutes.get("/:userId", getUser);

// UPDATE : update user. Alternative : "/:id/update"
// userRoutes.put("/:userId", editUser);

// DELETE : delete user. Alternative : "/:id/delete"
// userRoutes.delete("/:userId", removeUser);

export { userRoutes }; // OR export default router;
