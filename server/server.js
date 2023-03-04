// Module (server.js - Entry Point) : Express server App (HTTP server, DB Conn., N/W and file configs etc.)

import { app } from "./app/index.js";
import { mongoose } from "mongoose";
import { connectDB } from "./app/config/db.config.js";
import { ErrorHandler } from "./app/middlewares/errorHandler.middleware.js";
import { logger } from "./app/config/logger.js";
import config from "./app/config/config.js";

const { port } = config;
let server;

// MongoDB Conn. : Using events & w/o callbacks [Recommended]
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

// Add an event listener for the 'SIGINT' event
process.on("SIGINT", async () => {
  // Close MongoDB connection & exit process with zero exit code
  logger.warn(`Process ${process.pid} has been interrupted`);
  await mongoose.connection.close();
  process.exit(0);
});

/* Reference Links, Code & Info
  - https://github.com/goldbergyoni/nodebestpractices
  - https://github.com/hagopj13/node-express-boilerplate/
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/index.js
  - https://blog.heroku.com/best-practices-nodejs-errors
  - https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  - https://www.gosquared.com/blog/node-js-error-handling-callbacks-vs-promises
  - https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/catchunhandledpromiserejection.md
*/
