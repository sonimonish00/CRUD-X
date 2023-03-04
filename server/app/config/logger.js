// APM Logging & Monitoring Lib. : Winston (Log shipper - sematext,elasticsearch,cloudwatch,Logstash etc.) [logs application-level events and information]

import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";
// Setting up __dirname for ES Module - will point to current folder `config`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import config from "./config.js";
const { env } = config;

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// Transports : LogShipper (Sematext, Logstash,elasticsearch, splunk), APM (Datadog,honebadge,stackify), Email etc.
const consoleTransport = new winston.transports.Console({
  stderrLevels: ["error"],
});

const fileTransport = new winston.transports.File({
  // path : `config/logs/error.log`
  filename: __dirname + "/logs/error.log",
});

const loggerFormat = winston.format.combine(
  enumerateErrorFormat(),
  env === "development"
    ? winston.format.colorize()
    : winston.format.uncolorize(),
  winston.format.splat(),
  winston.format.printf(({ level, message }) => `${level}: ${message}`)
);

const logger = winston.createLogger({
  level: env === "development" ? "debug" : "info",
  format: loggerFormat,
  transports: [consoleTransport, fileTransport],
});

export { logger };

/* Reference Link 
  - https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/apmproducts.md
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/config/logger.js
  - https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/usematurelogger.md
  - https://errorception.com
  - https://www.muscula.com
  - https://sematext.com/blog/node-js-error-handling/#6-use-a-centralized-location-for-logs-and-error-alerting
  - https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
  - https://betterstack.com/community/guides/logging/
*/
