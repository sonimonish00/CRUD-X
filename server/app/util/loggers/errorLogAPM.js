// Logging nd monitoring - APM Logging Middleware
// Usage (index.js) -> app.use(logger,HttpLogger)
// Also API Docs of Error using Swagger
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/usematurelogger.md
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/testingerrorflows.md
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/apmproducts.md

// *****************************************************8
//https://errorception.com or https://www.muscula.com

// https://sematext.com/blog/node-js-error-handling/#6-use-a-centralized-location-for-logs-and-error-alerting
// Node.js Logging Frameworks (Winston is preffered)
// Winston - A log shipper (Shippers - sematext,elasticsearch,cloudwatch,Vector,Fluentbit, Logagent, Logstash)
// Morgan - for Logging HTTP Req i.e HTTPLogger - A logging lib., as it helps u format & structure ur logs
// Pino

// https://sematext.com/blog/best-log-management-tools/
// Sematext Logsense (winston extension : winston-logsene)
// Honeybadge
// Logz.io
// LogDNA
// Elasticsearch
// Datadog
// Splunk
