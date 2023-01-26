// Middleware : Morgan (log HTTP req/res/errors to console/file/etc. using winston's stream) [index.js]
// NOTE : morgan is middleware used with winston lib. & is declared before any Route ie. app.use(morgan) should be before any app.get(routes)

// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/config/morgan.js

// This will log all the http request in the format specified by morgan and send it to the winston's stream to be handled by winston which will then store logs to console and file via its transport feature. you could even transport to a server commonly called log shippers  or APM log mgmt tools such as datadog, splunk, sematext, honeybadge, Elastic Stack (previously known as Elasticsearch, Logstash and Kibana) etc. Also you could send email via `winston-mail` module as transport

// Alternative [Combine morgan and winston by default as middleware] : https://www.npmjs.com/package/express-winston

import morgan from "morgan";
import config from "../config/config.js";
import { logger } from "../config/logger.js";

morgan.token("message", (req, res) => res.locals.errorMessage || "");

const getIpFormat = () =>
  config.env === "production" ? ":remote-addr - " : "";
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export default {
  successHandler,
  errorHandler,
};
