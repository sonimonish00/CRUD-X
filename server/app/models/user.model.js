import { model, mongoose, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { roles } from "../config/roles.js";
import { toJSON } from "./plugins/toJSON.plugin.js";

// Pluralizing so that colllection names don't get modified
mongoose.pluralize(null);

const UserSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      // enum: ["user", "admin", "manager", "salesperson"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
UserSchema.plugin(toJSON);

/**
 * Check if email is taken
 * @param {string} email_id - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
UserSchema.statics.isEmailTaken = async function (email_id, excludeUserId) {
  const user = await this.findOne({ email_id, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
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

/**
 * @typedef User
 * @description Compile model from Schema
 */
const User = model("User", UserSchema);

export { User };

/* Reference Links, Code & Info : For internal/custom/3rd party Validation & Mongoose other things
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/models/user.model.js
  - https://medium.com/@SigniorGratiano/mongoose-and-express-68994fcfdeff

  Database (MongoDB Atlas) : `crudxDB`
  Model (Collctn./Table) : `User`
  Name (Schema - Capital Singlr.) : UserSchema, ShoppingCartSchema etc.
  Name (Model - Capital Singlr.) : User, ShoppingCart etc.
  Name (File/Folder) : models/user.model.js, models/shoppingCart.model.js

  [TODO] : Add more fields and validations
    mobile: { type: Number },
    location: { type: String },
    date_of_birth: { type: Date },
    order: { type: Schema.Types.ObjectId, ref: "Order" },

*/
