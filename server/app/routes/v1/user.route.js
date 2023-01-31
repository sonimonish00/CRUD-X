// DB : `crudxDB`
// Collection (Table) : `User`
// Route related err : https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#route_parameters

import express from "express";
import { createUser, getUsers } from "../../controllers/user.controller.js";
import { validate } from "../../middlewares/validateJoi.middleware.js";
import { addUser } from "../../validations/user.validation.js";

const userRoutes = express.Router();

// Routes naming convention : leverage HTTP verbs/methods.

// CREATE : create user -> "/users" | Alternative : "/create"
// Eg. : /tickets/<id>/messages -> create new msg in ticket #id
userRoutes.post("/", validate(addUser), createUser);

// READ : get all users -> "/users/"
userRoutes.get("/", getUsers);
// geUsers short form gU : userRoutes.get(auth('gU), validate(userValidation.gU), userController.gU)

// READ : get particular user with `id` -> "/users/:id"
// Eg. : /tickets/12/messages/5 -> get message #5 for ticket #12
// userRoutes.get("/:userId", getUser);

// UPDATE : update user. Alternative : "/:id/update"
// userRoutes.put("/:userId", updateUser);

// DELETE : delete user. Alternative : "/:id/delete"
// userRoutes.delete("/:userId", deleteUser);

// [TODO] : Swagger Defintions for this route file

export default userRoutes;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     description: Right now anyone can create a User.
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - First Name
 *               - Last Name
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *                 description: your last name
 *             example:
 *               firstName: fake first name
 *               lastName: fake last name
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *
 *   get:
 *     summary: Get all users
 *     description: Anyone could get list of all users from DB
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         firstName: firstName
 *         schema:
 *           type: string
 *         description: User's first name
 *       - in: query
 *         lastName: lastName
 *         schema:
 *           type: string
 *         description: User's last name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
