const mongoose = require("mongoose");

// Models are defined through the Schema interface.
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
// const MyModel = mongoose.model('ModelName', mySchema);

// const BlogPost = new Schema({
//   author: ObjectId,
//   title: String,
//   body: String,
//   date: Date
// });

// const Comment = new Schema({
//     name: { type: String, default: 'hahaha' },
//     age: { type: Number, min: 18, index: true },
//     bio: { type: String, match: /[a-z]/ },
//     date: { type: Date, default: Date.now },
//     buff: Buffer
//   });

// const MyModel = mongoose.model('Ticket', mySchema); // Then MyModel will use the tickets collection,

const userSchema = new mongoose.Schema({
  firstN: {
    type: String,
    required: true,
  },
  lastN: {
    type: String,
    required: true,
  },
});

// 'User' Table will be created in Ex1CRUD DB, which will be returned as object to mutate on.
const User = mongoose.model("User", userSchema);

let personStaticArr = [
  { firstN: "Monish", lastN: "Soni" },
];

User.collection.insertMany(personStaticArr,(err)=>{
  if(err){
    console.log(err.message)
  }
  else{
    console.log("10 Users Saved into Database !!!");
  }
})

module.exports = User;