// Using `path` as it will be platform independent & to write it in ES6 format we need `url` also.
import Joi from "@hapi/joi";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Configuring ES6 path for dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../env/.env.development") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development").required(),
    PORT: Joi.number().default(5000),
    MONGODB_ATLAS_URL: Joi.string().required().description("MongoDB Atlas URL"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Environment Config validation error: ${error.message}`);
}
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoDBURL: envVars.MONGODB_ATLAS_URL,
};

/*
  Refer Link : https://github.com/hagopj13/node-express-boilerplate/blob/master/src/config/config.js
*/
