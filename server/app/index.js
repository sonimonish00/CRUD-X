import express from "express";
import { userRoutes } from "./routes/user.routes.js";
const app = express();

// Middlewares (Built-in + Custom)
app.use(express.json());

// We've 4 types of client roles : User, Admin, Manager, Salesman
// Homepage URL : http://localhost:2000
app.get("/", (req, res) => {
  res.send("Welcome to homepage (Dashboard)");
});
// Routes -> REST API Endpoints (CRUD) : User Role
app.use("/", userRoutes); // http://localhost:2000/users

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
