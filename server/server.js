// CommonJS/AMD Module(CJS) - require & exports.foo(for single) OR module.exports(for multiple)
// const mongoose = require("mongoose");
// ES6 Module(ESM) - import & export default(for single) OR export(for multiple)
import { mongoose, Schema } from "mongoose";
import { MongoClient } from "mongodb";

import dotenv from "dotenv";
import { connectDB } from "./database/DBConn.js";
import express from "express";

dotenv.config({ path: "env/.env" });
const port = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.send("Welcome to CRUD-X : Production Environment");
  } else if (process.env.NODE_ENV === "development") {
    res.send("Welcome to CRUD-X : Development Environment");
  } else {
    res.send("Welcome to CRUD-X : Environment Undefined");
  }
});

app.listen(port, () => {
  console.log(
    `Backend : Node(express) server started listening on port : ${port}`
  );
});
// MongoDB Connection Pattern 1 : Using events & w/o callbacks (Recommended)
// connectDB();
// mongoose.connection
//   .on('connected',()=> console.log('Connected to MongoDB'))
//   .on('error',(error)=> console.log('MongoDB Error : ',error))
//   .on('disconnected',()=> console.log('Disconnected from MongoDB'))
//   .once('open', () => {
//     app.listen(port, () => {console.log(`Backend : Node(express) server started listening on port : ${port}`)})
//   })
// process.on('SIGINT', async()=>{await mongoose.connection.close(); process.exit(0)})

// MongoDB Connection Pattern 2 : Using callbacks & w/o events.
// connectDB(()=>{
//     app.listen(port, () => {console.log(`Backend : Node(express) server started listening on port : ${port}`)})
//   });
