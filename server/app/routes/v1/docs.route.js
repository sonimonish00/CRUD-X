import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "../../docs/swaggerDef.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsRoute = express.Router();
const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: [
    `${__dirname}../../../docs/*.yml`,
    `${__dirname}../../../routes/v1/*.js`,
  ],
});

docsRoute.use("/", swaggerUi.serve);
docsRoute.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

export default docsRoute;

/* Reference Links, Code & Info
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/routes/v1/docs.route.js
*/
