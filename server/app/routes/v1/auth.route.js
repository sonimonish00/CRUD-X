// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/routes/v1/auth.route.js

// API Routes for Auth : router.post('/register', validate(authValidate.register), authController.register)
// [TODO] : Swagger Defintions (API Docs)

import express from "express";
import { validate } from "../../middlewares/validateJoi.middleware.js";
import { authValidation } from "../../validations/auth.validation.js";
import { authController } from "../../controllers/auth.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";

const authRoute = express.Router();

authRoute.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

export default authRoute;
