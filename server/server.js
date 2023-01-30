// Node/Express App : Resource/Template/boilerplate (PRODUCTION ready/grade | Industry Standard Refactoring)
// 1. https://github.com/goldbergyoni/nodebestpractices
// 2. https://github.com/hagopj13/node-express-boilerplate/

// Different names could be : index.js but i prefer `server.js` bcz it specifies name in its context.
// Separating of Concern : App vs Server (ES6 Module sys)
// 1. Entry point - `Server.js` => HTTP server, DB Conn., N/W and file configs etc.
// 2. App code - `App/index.js` => MVC (Tech. Role based) => Future : Comp. based
// NOTE : naming convention in both MVC & comp. is like `user.routes.js` etc.
// [TODO] : Also see this https://github.com/hagopj13/node-express-boilerplate/blob/master/src/index.js

import { app } from "./app/index.js";
import { mongoose } from "mongoose";
import { connectDB } from "./app/config/db.config.js";
import { ErrorHandler } from "./app/middlewares/errorHandler.middleware.js";
import { logger } from "./app/config/logger.js";
import config from "./app/config/config.js";

const { port } = config;
let server;

// MongoDB Connection : Using events & w/o callbacks (Recommended)
await connectDB();
await mongoose.connection
  .on("connected", () => logger.info("Connected to MongoDB"))
  .on("error", (error) => logger.error(`MongoDB Error : ${error}`))
  .on("disconnected", () => logger.info("Disconnected from MongoDB"))
  .once("open", () => {
    server = app.listen(port, () => {
      try {
        logger.info(
          `Backend => ExpressJS server started listening on port : ${port} (${process.env.NODE_ENV} Mode)`
        );
      } catch (error) {
        logger.error(error);
      }
    });

    // Handling unhandledRejction & unCaughtException (Programmer Error)
    ErrorHandler.initializeUnhandledException(server);
  });

// [TODO] : https://blog.heroku.com/best-practices-nodejs-errors
// https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
// https://www.gosquared.com/blog/node-js-error-handling-callbacks-vs-promises
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/catchunhandledpromiserejection.md
// Add an event listener for the 'SIGINT' event
process.on("SIGINT", async () => {
  // Close MongoDB connection & exit process with zero exit code
  logger.warn(`Process ${process.pid} has been interrupted`);
  await mongoose.connection.close();
  process.exit(0);
});
