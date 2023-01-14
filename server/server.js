// Separating of Concern : App vs Server (ES6 Module sys)
// 1. Entry point - `Server.js` => HTTP server, DB Conn., N/W and file configs etc.
// 2. App code - `App/index.js` => MVC (Tech. Role based) => Future : Comp. based
// NOTE : naming convention in both MVC & comp. is like `user.routes.js` etc.

import { app } from "./app/index.js";
import dotenv from "dotenv";
dotenv.config({ path: "env/.env" });
import { mongoose } from "mongoose";
import { connectDB } from "./config/db.config.js";

const port = process.env.PORT || 5000;

// MongoDB Connection Pattern 1 : Using events & w/o callbacks (Recommended)
connectDB();
mongoose.connection
  .on("connected", () => console.log("Connected to MongoDB"))
  .on("error", (error) => console.log("MongoDB Error : ", error))
  .on("disconnected", () => console.log("Disconnected from MongoDB"))
  .once("open", () => {
    app.listen(port, () => {
      try {
        console.log(
          `Backend : Node(express) server started listening on port : ${port}`
        );
      } catch (error) {
        console.log(error);
      }
    });
  });

// Add an event listener for the 'SIGINT' event
process.on("SIGINT", async () => {
  // Close the MongoDB connection
  await mongoose.connection.close();
  // Exit the process with a zero exit code
  process.exit(0);
});

// Programmer Err. (Handler : EventEmitter) : globally handles `promise rejections`
process.on("unhandledRejection", (reason, promise) => {
  // https://www.honeybadger.io/blog/errors-nodejs/
  // Honeybadger.notify({
  //   message: "Unhandled promise rejection",
  //   params: {
  //     promise,
  //     reason,
  //   },
  // });
  console.error(reason);
  process.exit(1);

  // setTimeout(() => { // If graceful shutdown is not achieved after 1 sec, shutdown process completely
  //   process.abort(); // exit immediately and generate a core dump file
  // }, 1000).unref()
});

// Programmer Err. (Handler : EventEmitter) : globally handles `uncaught exceptions`
process.on("uncaughtException", (error) => {
  // Honeybadger.notify(error); // log the error in a permanent storage

  console.error(error);
  if (!isOperationalErr(error)) {
    process.exit(1); // exit the process with a non-zero exit code - graceful shutdown
  }

  // setTimeout(() => { // If graceful shutdown is not achieved after 1 sec, shutdown process completely
  //   process.abort(); // exit immediately and generate a core dump file
  // }, 1000).unref()
});

// Helper Function - If error is not operational i.e programmer err then exit gracefully
function isOperationalErr(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

// MongoDB Connection Pattern 2 : Using callbacks & w/o events.
// connectDB(()=>{
//     app.listen(port, () => {console.log(`Backend : Node(express) server started listening on port : ${port}`)})
//   });
