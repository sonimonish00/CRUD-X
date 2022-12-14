// Database (MongoDB Atlas) : `crudxDB`
// Model (Collctn./Table) : `User`
// Name (Schema - Capital Singlr.) : UserSchema, ShoppingCartSchema etc.
// Name (Model - Capital Singlr.) : User, ShoppingCart etc.
// Name (File/Folder) : models/user.model.js, models/shoppingCart.model.js

// Import members (ES6) : fn. -> `model` | Class (CF) -> `Schema`
import { model, mongoose, Schema } from "mongoose";
// import pkg from "@hapi/joi";
// const { Joi } = pkg;

// Pluralizing so that colllection names don't get modified
mongoose.pluralize(null);

// Define a schema without any validations as of now...
// [PENDING] : Add more fields and validations
const UserSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email_id: { type: String },
  password: { type: String },
  mobile: { type: Number },
  location: { type: String },
  date_of_birth: { type: Date },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Salesperson", "Customer"],
    default: "Customer",
  },
  // order: { type: Schema.Types.ObjectId, ref: "Order" },
});

// Virtual Method : To get users fullname
UserSchema.virtual("fullname").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.first_name}, ${this.last_name}`;
  }
  // Return "" OR "Anonymous User" String if user doesnt have first/lastname
  if (!this.first_name || !this.last_name) {
    fullname = "Anonymous User";
  }
  return fullname;
});

// Create a @hapi/joi validation schema for the user
// const userValidationSchema = Joi.object({
//   first_name: Joi.string(),
//   last_name: Joi.string(),
//   email_id: Joi.string().email(),
//   password: Joi.string(),
//   mobile: Joi.number(),
//   location: Joi.string(),
//   date_of_birth: Joi.date(),
//   role: Joi.string()
//     .valid(["Admin", "Manager", "Salesperson", "Customer"])
//     .default("Customer"),
// });

// Compile model from Schema
const User = model("User", UserSchema);
// Export member (ES6) : CF -> `User`
// export { User, userValidationSchema };
export { User };
