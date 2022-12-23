// import multer from "multer "; // For multipart/form-data
import express from "express";
import { userRoutes } from "./routes/user.route.js";
const app = express();

// app.use(cors()); // For using CORS

// Middlewares (Built-in + Custom)
app.use(express.json()); // For Content-Type: application/json
// app.use(express.urlencoded({ extended: true })); // For application/x-www-form-urlencoded

// We've 4 types of client roles : User, Admin, Manager, Salesman
// Homepage URL : http://localhost:2000
app.get("/", (req, res) => {
  res.send("Welcome to homepage (Dashboard)");
});

// Routes -> REST API Endpoints (CRUD) : User Role
// Naming convention : user small/plural nouns (not verbs)
// API Versioning : https://github.com/RootSoft/API-Naming-Convention#versioning
app.use("/users", userRoutes); // http://localhost:2000/users
// https://scoutapm.com/blog/express-error-handling
// https://simonplend.com/how-to-create-an-error-handler-for-your-express-api/
export { app };
