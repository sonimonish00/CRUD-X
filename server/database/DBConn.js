const mongoose = require("mongoose");
require('dotenv').config({ path: 'env/.env' });
const dev_db_url = 'local dev. db url is not defined.';
const mongoDB_URL = process.env.MONGO_URL || dev_db_url;
const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true};

// MongoDB Connection Pattern 1 : Using without callbacks
const connectDB = async () => {
    try {
     await mongoose.connect(mongoDB_URL, dbOptions);
    } catch (error) {
        console.error("Couldn't connect to MongoDB", error);
        process.exit(1);
    }
};

// MongoDB Connection Pattern 2 : Using callbacks
// const connectDB = async (callback) => {
//     try {
//         await mongoose.connect(mongoDB_URL, dbOptions)
//             .then(() => {
//                 callback();
//                 console.log("Connected to MongoDB");
//             })
//     } catch (error) {
//         console.error("Couldn't connect to MongoDB", error);
//         process.exit(1);
//     }
// };

module.exports = connectDB;