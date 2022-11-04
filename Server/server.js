// Loading Prod Environment 
const dotenv = require('dotenv').config({ path: 'Env/.env' });


// const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production'){
    console.log("This is production environment")
}
else if (process.env.NODE_ENV === 'development'){
    console.log("This is development environment")
}
else {
    console.log("I dont know which environment is this")
}




