#! /usr/bin/env node
/*
 * @Author: Monish
 * @Date: 20-Dec-2022 12:01 PM
 */
// Reference : https://github.com/mdn/express-locallibrary-tutorial/blob/main/populatedb.js
// Other : https://gist.github.com/internoma/99e50a3022c24dd9a37097c2d0423e54#file-populatedb-js

console.log(
  "This script populates test dataset `users` to MongoDB. Use => `node populateMongoDB` "
);

import dotenv from "dotenv";
dotenv.config({ path: "../env/.env" });
import async from "async";
import { mongoose } from "mongoose";
import { User } from "../app/models/user.model.js";
import { connectDB } from "./db.config.js";

// MongoDB Conn.: Using events & w/o callbacks (Recommended)
await connectDB();
await mongoose.connection
  .on("connected", () => console.log("Connected to MongoDB"))
  .on("error", (error) => console.log("MongoDB Error : ", error))
  .on("disconnected", () => console.log("Disconnected from MongoDB"))
  .once("open", () => {
    console.log("Connection Established !!");
  });
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// Creating tests for `users`
let users = [];

function userCreate(firstName, lastName, cb) {
  const userDetail = { first_name: firstName, last_name: lastName };
  const user = new User(userDetail);
  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    // console.log("New User created !! : " + user);
    users.push(user);
    cb(null, user);
  });
}

// Declaring Fn. async series & entering test datasets
// Refer : https://stackoverflow.com/questions/17853105/difference-between-async-series-and-async-parallel
function createUsers(cb) {
  async.series(
    [
      function (callback) {
        userCreate("Monish", "Soni", callback);
      },
      function (callback) {
        userCreate("Arshita", "Soni", callback);
      },
    ],
    // optional callback
    cb
  );
}
// Executing Fn.
async.series(
  [createUsers],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      //   console.log("Users List ==> " + results);
      console.log("Users List ==> " + users);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
