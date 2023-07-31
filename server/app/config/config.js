// Using `path` as it will be platform independent & to write it in ES6 format we need `url` also.
import Joi from "@hapi/joi";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Configuring ES6 path for dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../env/.env") });
// dotenv.config({ path: path.join(__dirname, "../../env/.env.development") });
// dotenv.config({ path: path.join(__dirname, "../../env/.env.test") });

//[TODO] : Pending if u want to implement SMTP (Email) in future
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(5000),
    MONGODB_ATLAS_URL: Joi.string().required().description("MongoDB Atlas URL"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which verify email token expires"),
    GOOGLE_OAUTH_CLIENT_ID: Joi.string(),
    GOOGLE_OAUTH_CLIENT_SECRET: Joi.string(),
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
  mongoDBURL:
    envVars.MONGODB_ATLAS_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  googleOauth2: {
    client_id: envVars.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: envVars.GOOGLE_OAUTH_CLIENT_SECRET,
  },
};

/*
  Refer Link : https://github.com/hagopj13/node-express-boilerplate/blob/master/src/config/config.js
*/
