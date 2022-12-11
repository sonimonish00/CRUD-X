import express from "express";
const app = express();

// Middlewares
app.use(express.json());

// We've 4 types of client roles : User, Admin, Manager, Salesman
// Routes -> REST API Endpoints (CRUD) : User Role
import { userRoutes } from "./routes/user.routes.js";
app.use("/users", userRoutes); // http://localhost:2000/users OR users/all

export { app };

// Extra ==> Testing for dev/prod env
/* app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.send("Welcome to CRUD-X : Production Environment");
  } else if (process.env.NODE_ENV === "development") {
    res.send("Welcome to CRUD-X : Development Environment");
  } else {
    res.send("Welcome to CRUD-X : Environment Undefined");
  }
});
*/
