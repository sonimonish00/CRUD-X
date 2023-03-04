#! /usr/bin/env node
/*
 * @Author: Monish
 * @Date: 20-Dec-2022 12:01 PM
 */

import { logger } from "./../../app/config/logger.js";

logger.info(
  "This script populates test dataset `users` to MongoDB. Use => `node populateMongoDB` "
);

import async from "async";
import { mongoose } from "mongoose";
import { User } from "../../app/models/user.model.js";
import { connectDB } from "../../app/config/db.config.js";

// MongoDB Conn.: Using events & w/o callbacks (Recommended)
await connectDB();
await mongoose.connection
  .on("connected", () => logger.info("Connected to MongoDB"))
  .on("error", (error) => logger.error(`MongoDB Error : ${error}`))
  .on("disconnected", () => logger.info("Disconnected from MongoDB"))
  .once("open", () => {
    logger.info("Connection Established !!");
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
    users.push(user);
    cb(null, user);
  });
}

// Declaring Fn. async series & entering test datasets
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
      logger.error(`FINAL ERR: ${err}`);
    } else {
      logger.info(`Users List ==> ${users}`);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

/* Reference Links, Code & Info
  Different Names : Setup Test DB, Seed DB, Populate DB etc. [Used in testing - unit/integration]
  [TODO] : in future if scales, multiple DB needed to be used to make multiple folder and files respectively
  - https://github.com/mdn/express-locallibrary-tutorial/blob/main/populatedb.js
  - https://gist.github.com/internoma/99e50a3022c24dd9a37097c2d0423e54#file-populatedb-js
  - https://stackoverflow.com/questions/17853105/difference-between-async-series-and-async-parallel
*/
