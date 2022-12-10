import express from "express";
const app = express();
// const router = express.Router(); ==> This will be in Router folder

app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.send("Welcome to CRUD-X : Production Environment");
  } else if (process.env.NODE_ENV === "development") {
    res.send("Welcome to CRUD-X : Development Environment");
  } else {
    res.send("Welcome to CRUD-X : Environment Undefined");
  }
});
export { app };
