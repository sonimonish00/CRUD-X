import { model, mongoose, Schema } from "mongoose";
import { toJSON } from "./plugins/toJSON.plugin.js";
import { tokenTypes } from "../config/tokens.js";

mongoose.pluralize(null);

const TokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL,
      ],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
TokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Token = model("Token", TokenSchema);

export { Token };

/* Reference Links, Code & Info
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/models/token.model.js
*/
