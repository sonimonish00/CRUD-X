import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "env/.env" });

const mongoDB_URL = process.env.MONGO_URL || undefined;
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// MongoDB Connection Pattern 1 : Using without callbacks
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoDB_URL, dbOptions);
  } catch (error) {
    console.error("Couldn't connect to MongoDB", error);
    process.exit(1);
  }
};

// MongoDB Connection Pattern 2 : Using async/await with promises/.then (Not good - double load)
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
