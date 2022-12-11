import express from "express";
const router = express.Router();

import { getAllUsers } from "../controllers/user.controllers.js";
router.get("/", (req, res) => {
  res.send("This is Default User API Path - without calling controller");
});
router.get("/all", getAllUsers);

export { router as userRoutes };
// OR export default router;
