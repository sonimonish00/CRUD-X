import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "env/.env" });

// MongoDB Connection Setup - Pattern 1 : Using without callbacks
const connectDB = async () => {
  try {
    const mongoDB_URL = process.env.MONGODB_ATLAS_URL || undefined;
    const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoDB_URL, dbOptions); //No need of `await`, mongoose handles conn. buffering internally.
  } catch (error) {
    console.error("Couldn't connect to MongoDB => ", error);
    process.exit(1);
  }
};

// MongoDB Connection Setup - Pattern 2 : Using async/await with promises/.then (Not good - double load)
// const connectDB = async (cb) => {
//     try {
//         await mongoose.connect(mongoDB_URL, dbOptions)
//             .then(() => {
//                 cb();
//                 console.log("Connected to MongoDB");
//             })
//     } catch (error) {
//         console.error("Couldn't connect to MongoDB", error);
//         process.exit(1);
//     }
// };

export { connectDB };

/*
  Refer Link : https://github.com/hagopj13/node-express-boilerplate/blob/master/src/config/config.js
*/
