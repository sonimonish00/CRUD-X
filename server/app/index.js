import express from "express";
const app = express();

// Testing for prod/dev env
app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.send("Welcome to CRUD-X : Production Environment");
  } else if (process.env.NODE_ENV === "development") {
    res.send("Welcome to CRUD-X : Development Environment");
  } else {
    res.send("Welcome to CRUD-X : Environment Undefined");
  }
});

// Usage - Dummy Route testing - call route w/o callback to controller
// import { router as userRouter} from "./routes/user.routes.js";
// Middleware
// app.use("/all", userRouter); => path will be like localhost/all/used & /all/notused

export { app };
