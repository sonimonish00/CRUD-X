// CommonJS/AMD Module(CJS) - require & exports.foo(for single) OR module.exports(for multiple)
const mongoose = require("mongoose");
// ES6 Module(ESM) - import & export default(for single) OR export(for multiple)
  // import {mongoose,schema} from 'mongoose';
  // import { MongoClient } from 'mongodb'

require('dotenv').config({ path: 'env/.env' });
const connectDB = require('./database/DBConn')
const port = process.env.PORT || 5000;
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  if (process.env.NODE_ENV === 'production'){
    res.send('Welcome to CRUD-X : Production Environment')
  }
  else if (process.env.NODE_ENV === 'development'){
    res.send('Welcome to CRUD-X : Development Environment')
  }
  else {
    res.send('Welcome to CRUD-X : Environment Undefined')
  }  
})

// MongoDB Connection Pattern 1 : Using events & w/o callbacks.
connectDB();
mongoose.connection
  .on('connected',()=> console.log('Connected to MongoDB'))
  .on('error',(error)=> console.log('MongoDB Error : ',error))
  .on('disconnected',()=> console.log('Disconnected from MongoDB'))
  .once('open', () => {app.listen(port, () => {console.log(`Backend : Node(express) server started listening on port : ${port}`)})})
process.on('SIGINT', async()=>{await mongoose.connection.close(); process.exit(0)})

// MongoDB Connection Pattern 2 : Using callbacks & w/o events.
// connectDB(()=>{
//     app.listen(port, () => {console.log(`Backend : Node(express) server started listening on port : ${port}`)})
//   });




