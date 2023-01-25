// Middleware : Morgan (log HTTP req/res/errors to console/file/etc. using winston's stream) [index.js]
// NOTE : morgan is middleware used with winston lib. & is declared before any Route ie. app.use(morgan) should be before any app.get(routes)

// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/config/morgan.js

// app.use(morgan('combined', { stream: winston.stream }));
// app.use(require("morgan")("combined", { "stream": logger.stream }));
// This will log all the http request in the format specified by morgan and send it to the winston's stream to be handled by winston which will then store logs to console and file via its transport feature. you could even transport to a server commonly called log shippers  or APM log mgmt tools such as datadog, splunk, sematext, honeybadge, Elastic Stack (previously known as Elasticsearch, Logstash and Kibana) etc. Also you could send email via `winston-mail` module as transport

// Alternative [Combine morgan and winston by default as middleware] : https://www.npmjs.com/package/express-winston
