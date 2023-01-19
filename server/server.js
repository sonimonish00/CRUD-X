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
import dotenv from "dotenv";
dotenv.config({ path: "env/.env" });
import { mongoose } from "mongoose";
import { connectDB } from "./app/config/db.config.js";
import { ErrorHandler1 } from "./app/middlewares/errorHandler.middleware.js";

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
  // Close MongoDB connection & exit process with zero exit code
  await mongoose.connection.close();
  process.exit(0);
});

// Handling unhandledRejction & unCaughtException (Programmer Error)
ErrorHandler1.initializeUnhandledException();

// MongoDB Connection Pattern 2 : Using callbacks & w/o events.
// connectDB(()=>{
//     app.listen(port, () => {console.log(`Backend : Node(express) server started listening on port : ${port}`)})
//   });
