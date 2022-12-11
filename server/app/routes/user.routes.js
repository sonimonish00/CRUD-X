import express from "express";
const router = express.Router();

// Dummy Route without controller callback
router.get("/used", (req, res) => {
  res.send("Used items");
});

// Dummy Route with controller callback ie route-handler callback fn.
// import {user_controller} from "../controllers/user.controllers.js"
// router.get("/notused", user_controller.customFn);

export { router };
