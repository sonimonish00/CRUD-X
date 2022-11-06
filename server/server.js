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

// Connecting to DB
connectDB(()=>{
  app.listen(port, () => {
    console.log(`Backend : NodeJS/express server started on http://localhost:${port}`)
  })
});



