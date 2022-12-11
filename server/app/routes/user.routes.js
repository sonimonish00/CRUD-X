import express from "express";
const router = express.Router();

import { getAllUsers } from "../controllers/user.controllers.js";

router.get("/users", getAllUsers);

export { router as userRoutes };
// OR export default router;
