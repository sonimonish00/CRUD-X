// Separating of Concern : App vs Server (ES6 Module sys)
// 1. Entry point - `Server.js` => HTTP server, DB Conn., N/W and file configs etc.
// 2. App code - `App/index.js` => MVC (Tech. Role based) => Future : Comp. based
// NOTE : naming convention in both MVC & comp. is like `user.routes.js` etc.
// [TODO] : Refactor like https://github.com/hagopj13/node-express-boilerplate
// [TODO] : Also see this https://github.com/hagopj13/node-express-boilerplate/blob/master/src/index.js

import { app } from "./app/index.js";
import dotenv from "dotenv";
dotenv.config({ path: "env/.env" });
import { mongoose } from "mongoose";
import { connectDB } from "./config/db.config.js";
import { ErrorHandler1 } from "./app/middlewares/erroHandler.middleware.js";

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

// Handling unhandledRejction & unCaughtException (Programmer Error)
ErrorHandler1.initializeUnhandledException();

// MongoDB Connection Pattern 2 : Using callbacks & w/o events.
// connectDB(()=>{
//     app.listen(port, () => {console.log(`Backend : Node(express) server started listening on port : ${port}`)})
//   });
