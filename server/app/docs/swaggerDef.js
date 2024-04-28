import pkgObj from "../../package.json" assert { type: "json" };
import config from "../../app/config/config.js";

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "CRUD-X",
    description: "A fullstack web App - MERN",
    version: pkgObj.version,
    license: {
      name: "MIT",
      url: "https://github.com/sonimonish00/CRUD-X/blob/main/LICENSE",
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: "Development server",
    },
  ],
};
// Replace the "localhost" URL Above with the production ready URL where u want to test swagger API docs. As of now keeping it localhost bcz dont want to test it anywhere else.
export default swaggerDef;

/* Reference Links, Code & Info
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/docs/swaggerDef.js
  - https://www.npmjs.com/package/swagger-autogen
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/routes/v1/user.route.js
  - https://github.com/hagopj13/node-express-boilerplate/blob/master/src/routes/v1/docs.route.js
*/
