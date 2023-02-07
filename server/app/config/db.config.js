import mongoose from "mongoose";
import config from "./config.js";
import { logger } from "./logger.js";

const { mongoDBURL } = config;
// MongoDB Connection Setup (Not as per best practice but still good to go)
const connectDB = async () => {
  try {
    const mongoURL = mongoDBURL || undefined;
    const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURL, dbOptions); //No need of `await`, mongoose handles conn. buffering internally.
  } catch (error) {
    logger.error("Couldn't connect to MongoDB => ", error);
    process.exit(1);
  }
};

export { connectDB };
