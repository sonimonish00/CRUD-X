// Loading Prod Environment 
const dotenv = require('dotenv').config({ path: 'env/.env' });
// const port = process.env.PORT || 5000;
// if (process.env.NODE_ENV === 'production'){console.log("This is production environment")}
// else if (process.env.NODE_ENV === 'development'){console.log("This is development environment")}
// else {console.log("I dont know which environment is this")}

const express = require('express')
const app = express()
// const port = 6000

app.get('/', (req, res) => {
  console.log("Testing Nodejs express Server !!")
  res.send('Hello World!!! This is a CRUD-X Web App (Backend/Node-express)...Coming Soon !!')
})
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Started...`)
})


