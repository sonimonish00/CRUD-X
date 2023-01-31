// [TODO] : Swagger API Documentation
// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/docs/swaggerDef.js

// also refer
// https://www.npmjs.com/package/swagger-autogen
// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/routes/v1/user.route.js
// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/routes/v1/docs.route.js
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

export default swaggerDef;
