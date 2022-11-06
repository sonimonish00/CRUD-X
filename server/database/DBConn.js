const mongoose = require("mongoose");
require('dotenv').config({ path: 'env/.env' });

const dev_db_url = 'local dev. db url is not defined.';
console.log(process.env.MONGO_URL);
const mongoDB_URL = process.env.MONGO_URL || dev_db_url;
const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true};

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

const connectDB = async (cb) => {
  await mongoose
    .connect(mongoDB_URL, dbOptions)
    .then(() => {
      cb();
      console.log("Connected to Database");
    })
    .catch((err) => console.error("Could not Connect to Database", err));
};

// (async () => {
//     try {
//       await mongoose.connect(dbURI, dbOptions)
//     } catch (err) {
//       console.log('error: ' + err)
//     }
// })()

module.exports = connectDB;