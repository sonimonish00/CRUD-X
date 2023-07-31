import express from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validateJoi.middleware.js";
import * as userValidation from "../../validations/user.validation.js";
import * as userController from "../../controllers/user.controller.js";

const userRoutes = express.Router();

// [AuthN/R] : Only `admin` has right to `manageUsers` ie. register & `user` has right to get all users.
userRoutes
  .route("/")
  .post(
    auth("manageUsers"),
    validate(userValidation.addUser),
    userController.createUser
  )
  // .get(auth(), validate(userValidation.queryUsers), userController.getUsers);
  .get(validate(userValidation.queryUsers), userController.getUsers);

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
 *     summary: Create a user (Register/Signup)
 *     description: Only Authenticated user with Right `manageUsers` permission cud access
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - "First Name"
 *               - "Last Name"
 *               - "Email ID"
 *               - Password
 *               - Role
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *                 description: your last name
 *               email_id:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [user, admin]
 *             example:
 *               firstName: fake first name
 *               lastName: fake last name
 *               email_id: fake@example.com
 *               password: password1
 *               role: user
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all users
 *     description: Any Authenticated user could get list of all users from DB
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: User's first name
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: User's last name
 *       - in: query
 *         name: email_id
 *         schema:
 *           type: string
 *         description: User's Email ID
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: User's Role (Admin, User)
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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/* Reference Links, Code & Info
  - [TODO] : Swagger Defintions for this route file
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/routes/v1/user.route.js
  - DB : `crudxDB` | Collection (Table) : `User`
  Routes naming convention : leverage HTTP verbs/methods.
    - CREATE : create user -> "/users" | Alternative : "/create" | Eg. : /tickets/<id>/messages -> create new msg in ticket #id
    - READ : get all users -> "/users/"
    - READ : get particular user with `id` -> "/users/:id"
      Eg. : /tickets/12/messages/5 -> get message #5 for ticket #12
      userRoutes.get("/:userId", getUser);
    - UPDATE : update user. Alternative : "/:id/update"
      userRoutes.put("/:userId", updateUser);
    - DELETE : delete user. Alternative : "/:id/delete"
      userRoutes.delete("/:userId", deleteUser);
*/
