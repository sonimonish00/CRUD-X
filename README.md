# CRUD-X [XERN Stack]

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/19573121-fa8f3446-bac8-4ed7-b25b-952c45912af2?action=collection%2Ffork&collection-url=entityId%3D19573121-fa8f3446-bac8-4ed7-b25b-952c45912af2%26entityType%3Dcollection%26workspaceId%3D85c3a0fe-9ab1-4704-82db-e7d9a493f158)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Coverage Status](https://coveralls.io/repos/github/sonimonish00/CRUD-X/badge.svg?branch=main)](https://coveralls.io/github/sonimonish00/CRUD-X?branch=main)

A basic CRUD web application using [X]ERN stack, Where X = multiple DB but as of now MongoDB. So MERN.

**NOTE** : Due to Time constraint, only implemented Backend API's in Node/Expressjs using MongoDB [User & Auth Model]. Will scale it to fully functional fullstack E-commerce app with multi-DB [XERN] with proper [Validation](https://gist.github.com/sonimonish00/88dc68510c45a084ca97d7239504e875) & [Testing](https://gist.github.com/sonimonish00/cb7509962bc3448513d250ed9a2d4465) features soon.

**Live Testing Link (Production Ready | Backend webservice | Node/Expressjs Server | REST API)**

- **[API Collection : Postman](https://www.postman.com/sonimonish00/workspace/workspace-1-personal-projects-backend)**
- **[Deployment : Railway.app](https://crud-x-production.up.railway.app)**

## Tech stack : [X]ERN

**Architectural :** Agile-Monolith-MVC (Future - [Component based](https://github.com/goldbergyoni/nodebestpractices#-11-structure-your-solution-by-components) + TDD)

**Frontend - client | static-site | web-asset | ui:** Reactjs

**Backend - Webserver/service/host/api | app-server:** Nodejs/express

**DBaaS [X] :** mongodb atlas (Future - elephantsql (postgre) | cockroachlab | astra (cassandra) | planetscale (mysql) | elasticloud)

## Installation | Deployment (local)

**For Fullstack (MERN) :** npm **FSUpdatePkgs** - to update local pkg to latest ver [See this](https://docs.npmjs.com/updating-packages-downloaded-from-the-registry)

```bash
  cd CRUD-X
  npm FSinstall
  npm FSdev (For Development - localhost)
  npm FSprod (For production)
```

**For Backend only (Node/Express) :**

```bash
  cd CRUD-X/server
  npm install
  npm dev (For Development - localhost)
  npm prod (For production)
```

**For Frontend only (React/CRA-webpack) :**

```bash
  cd CRUD-X/client
  npm install
  npm start (For Development - localhost)
  npm build (For production)
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed) [Same for .env.development & .env.test]
```

## Table of Contents

- [Features](#features-major)
- [Developer environment setup](#developer-environment-setup--ide--vcsscm--deployment--devops)
- [Linting & formating](#linting--formating-clean-code-stylebest-practises)
- [Fullstack flow](#fullstack-flow--rest--crud--http)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure-separation-of-concern)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [API Documentation](#api-documentation)
- [Authentication](#authentication-authn--jwt--google-oauth-20)
- [Authorization](#authorization-authr--rbac)
- [Logging](#logging)
- [Custom Mongoose Plugins](#custom-mongoose-plugins)
- [Contributing](#contributing)
- [FAQ](#faq)
- [Feedback & Support](#feedback--support)
- [About Me](#-about-me--hi-im-monish-)
- [Skills](#-skills)
- [Contact Links](#-contact-links)

## Features (Major)

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com) [Future : Multi-DB]
- **Authentication and authorization(RBAC)**: using [passport](http://www.passportjs.org) [JWT, Google OAuth 2.0]
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io) [Supertest]
- **Error handling**: centralized error handling mechanism (express middleware)
- **API docs**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io) [Not used in Prod]
- **Dependency management**: with [npm](https://npmjs.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) [Multi-Env : Dev, Prod, Test]
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io) [#Future-Implementation]
- **Santizing**: sanitize request data against xss and query injection [#Future-Implementation]
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression) [#Future-Implementation]
- **CI**: continuous integration with [Travis CI](https://travis-ci.org) [#Future-Implementation]
- **Code coverage**: using [coveralls](https://coveralls.io) [#Future-Implementation]
- **Code quality**: with [Codacy](https://www.codacy.com) [#Future-Implementation]
- **Docker support** [#Future-Implementation]

## Developer environment setup : IDE | vcs/scm | deployment | devops

**Local IDE :** VSCode

- **VSCode :** (See below Linter/Formatter section too)
  - Preq. - Git & Node (npm)
  - [Git-bash](https://stackoverflow.com/a/41199625) : NPM global pkgs **manual backup - npmGpkg** File (see CRUD-X Repo)
  - Ext. : Setting Sync on via Github A/C (update outdated npm global & local pkg manually | VScode ext. autoupdate)
- **Theme Download Links:**
  - Product Icon Theme - [Carbon](https://marketplace.visualstudio.com/items?itemName=antfu.icons-carbon)
  - File Icon Theme - [Material](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
  - Color Theme (General)
    - Ligature Fonts - [Cascadia Code](https://github.com/microsoft/cascadia-code) | [Fira Code](https://github.com/tonsky/FiraCode)
      - Note : Fira code includes Fira Mono | Editor Font size is 16 & Terminal is 15
      - Editor.FontFamily : 'Cascadia Code', 'Fira Code', Consolas, 'Courier New', monospace
    - Shell Theme (Terminal)
      - Nerd Fonts (Not Powerline Fonts)
        - [Cascadia/Caskaydia NF](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/CascadiaCode)
          - [Installation](https://github.com/microsoft/terminal/issues/12587#issuecomment-1054646238)
          - Terminal Font Family : 'CaskaydiaCove NF', 'CaskaydiaCove NF Mono', 'Cascadia Code', 'Fira Code', Consolas
      - Cross- Shell prompt - Starship (For bash & powershell only, not cmd) (Default configs)
        - [Powershell 7](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.3)
        - [Link 1](https://starship.rs/guide/#%F0%9F%9A%80-installation)
        - [Link 2](https://stackoverflow.com/a/8997378)
      - [Toggle Theme](https://marketplace.visualstudio.com/items?itemName=danielgjackson.auto-dark-mode-windows) -> `Ctrl+Alt+Shift+T`
      - Settings.json Workbench : Search "Preferred Color Theme"
        - Dark : [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)
        - Light : [Brackets Light Pro](https://marketplace.visualstudio.com/items?itemName=fehey.brackets-light-pro)
- **Online Code Snippet/Sandbox :** carbon.now.sh, Codepen.io
- ![VS Code Setup](https://drive.google.com/uc?export=view&id=1xN0GcT-vgVM8kKnZZIdQDVghB-2VXX45)

**Browser :** Mozilla | Chrome (Extension - React devtools, Redux devtools) (Sync Setting on - **PENDING**)

**VCS/SCM :** Github

**Cloud IDE (Remote) :** Github Codespace (Alternative - Repl.it [Mobile App/Hosting])

**Devops (CI/CD) :** Github Actions (For Dockerize : Docker/K8's)

**Deployment (PaaS) :**

- Vercel (Frontend/Static-Site/React-CRA)
  - Vercel could be used for backend deployment via (But will use it for frontend only) :
    - Serverless Function (i.e. rewrite your backend to make it serverless)
    - Vercel's NEXTJS Framework
  - Commands : build (npm run build) & start (npm run start)
- Railway.app (Backend/webservice) | DB (MongoDB Atlas)
  - Commands : build (Default) & start (npm run prod)

## Linting | Formating [Clean Code Style/Best Practises](https://github.com/goldbergyoni/nodebestpractices#3-code-style-practices)

NOTE : This Configuration/setups are for advanced level, skip this if u r beginner/intermediate, just install eslint & prettier vscode ext.
NOTE : js/jsx & ts/tsx is not diff. it's just use to denote that js/ts is for normal & jsx/tsx is for component. But .cjs & .mjs are diff.
NOTE : For browser default is CJS in html <script> tag, but if ur using MJS then u need to mention "type=module" in <script> tag. As we are using react here, we dont need to worry as react will build html for us.
NOTE : Alternative Names CJS => Source Type - Script | MJS => Source Type - Module

- **Extensions | NPM Packages (-D)**
  - [L1](https://stackoverflow.com/questions/68721073/what-is-the-difference-between-installing-eslint-as-extension-and-installing-as) | [L2](https://stackoverflow.com/questions/61925900/what-is-the-difference-between-installing-prettier-as-a-npm-package-and-installi) | [L3](https://eslint.org/docs/latest/user-guide/getting-started) | [L4](https://prettier.io/docs/en/comparison.html) | [L5](https://www.youtube.com/watch?v=ZXW6Jn6or1w) | [L6](https://www.youtube.com/watch?v=H91aqUHn8sE) | [L7](https://www.robinwieruch.de/prettier-eslint/)
  - VSCode : Global
    - Linter : Eslint
    - Formatter : Prettier
    - (Lint+Format) : Lintel, Prettier ESlint etc. (Refer Official website of both)
  - Node/NPM : Local (-D)
    - React : react, react-dom, jest
    - Linting (FE/BE)
      - Eslint : eslint, eslint-cli (CRA ESlint extends "react-app")
      - TS : typescript, ts-node, types/node, types/react, types/react-dom
    - Formatter : prettier
    - (Lint+Format) : prettier-eslint, etc. (Refer Official website of both)
    - Config (Custom) : .eslintrc.js (extends airbnb, react-app, etc), .prettierrc, .editorconfig, etc.
      - tsconfig.json (.tslintrc deprecated in favor of .eslintrc)
        - module = NodeNext for MJS & commonJS for CJS // 'import' needs .js extn. for MJS & .cjs for CJS
        - moduleResolution = NodeNext
- **Frontend (React v18+)** : React is defaulted to ES6/MJS module system.
  - **Current** : Javascript (ES6+)
    - Filename : .js/.jsx (js/jsx are equiv. here but as mentioned in note above, we use it for diff. purpose)
    - Module system : ES6 (.mjs) => import/export (we don't need to have .mjs extension bcz react CRA defaults to mjs so js/jsx=mjs)
  - **Future** : Typescript (CRA --template typescript)
    - Filename : .ts/.tsx (ts/tsx are equiv. here but as mentioned in note above, we use it for diff. purpose)
    - Module system : ES6 (.mjs) => import/export (js/jsx=mjs=ts/tsx, so we use ts/tsx only)
- **Backend (Node v18+)** : Node is defaulted to commonJS/js/cjs module system => require/module.exports
  - **Current** : Javascript (ES6+) // Node is defaulted to CJS, but here we use MJS so following settings will change.
    - Filename : .js/.mjs (Package.json => "type": "module") // Both js/mjs are equiv here bcz "module" is mentioned in package.json, we stick to .js
    - Module system : ES6 (js/mjs) => import/export // We r using "mjs", but if you wanna use "cjs" somewhere add "abc.cjs" ext. explicitly
  - **Future** : Typescript [see](https://www.youtube.com/watch?v=H91aqUHn8sE&t=15s)
    - Filename : .ts (Package.json => "type": "module" | `tsc` compiler : a.ts => a.js | node a.js)
    - Module system : ES6 (.mjs) => import/export (js=mjs=ts, so we use ts only)

## Fullstack flow : REST | CRUD | HTTP

- [Google Docs Link](https://docs.google.com/document/d/1L_Rc8JEn-YYX5Oq_dEa7iTkBQY_ycjH6OaPm7GV4O4I/edit?usp=share_link)
- ![Fullstack Flow Diagram](https://drive.google.com/uc?export=view&id=1yAM2pzILbeG_eDM3o2B11TDfJY5iymaT)
- ![SQL vs NoSQL](https://drive.google.com/uc?export=view&id=1HjkSrD-G9Y1gZAYdpVKO3T9QYYVX4wyv)
- ![REST CRUD HTTP DB](https://drive.google.com/uc?export=view&id=12FQpg3XgNIlLZmvSPAHKw65x_36S7mTv)

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash

NODE_ENV = development
# Port number
PORT = 3000
# URL of the Mongo DB
MONGODB_ATLAS_URL=mongodb://127.0.0.1:27017/node-boilerplate

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30
# Number of minutes after which a reset password token expires [RPT]
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
# Number of minutes after which a verify email token expires [VET]
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com

#Google-OAuth
GOOGLE_OAUTH_CLIENT_ID = 21321mklmklmlkmalsad.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET = KMKLK-dkfmlksdmfksd-ksdfmdslkdsfds
```

## Project Structure (separation of concern)

```
**CRUD-X (Root Folder)**/
├── **Client** [Feature/funct./comp. based] (Other - MVC, group by file type, pages with global folder/colocation of related comp. etc.)/
│   ├── public
│   ├── src/
│   │   ├── Assets : images, static file etc.
│   │   ├── Components (Templates/Props)/
│   │   │   ├── core : common and basic components, such as Home,Menu components which are common to all other comp.
│   │   │   ├── post : post-related components
│   │   │   ├── user : user-related components
│   │   │   └── componentFolderN : and so on....
│   │   ├── Pages
│   │   ├── Config (To overwrite global config - .eslintrc.js, .prettierrc, .editorconfig - CRA/webpack already has eslint so gen. we dont include it)
│   │   ├── i18n
│   │   ├── navigation : Router (Navigation) -> react-router-dom
│   │   ├── redux : actions, reducers, store.js [Redux Toolkit -> Redux & Thunk Dev tools]
│   │   ├── Services - API/
│   │   │   └── auth : auth-related components and helper code, routes etc.
│   │   ├── styles
│   │   ├── utils - Helper methods, validations etc.
│   │   ├── **tests** : Jest Framework (Unit testing)
│   │   └── index.js ===> Main entry point for react
│   ├── node_modules (frontend)
│   ├── .gitignore (frontend)
│   ├── Package.json (frontend) - including package-lock.json
│   └── README.MD (frontend)
├── **Server** [Separation based on functionality - [MVC](https://www.youtube.com/watch?v=bQuBlR0T5cc) or Technical Role based => FUTURE PENDING : [Component based](https://github.com/goldbergyoni/nodebestpractices#-11-structure-your-solution-by-components)]/
│   ├── app/
│   │   ├── config
│   │   ├── controllers
│   │   ├── docs
│   │   ├── middlewares
│   │   ├── models (ORM/MongoDB)
│   │   ├── routes -> [RESTful API endpoints - CRUD](https://stackoverflow.com/questions/14554943/what-are-the-trade-offs-between-different-methods-of-constructing-api-urls-subd) | [Link 1](https://ontola.io/blog/api-design/)
│   │   ├── services
│   │   ├── utils
│   │   ├── validations
│   │   ├── views
│   │   └── index.js -> Application code (MVC part)
│   ├── env -> .env, .env.development etc.
│   ├── tests -> Unit, Integration, fixtures, utils etc.
│   ├── server.js ===> Main entry point for nodejs server - contains http server, mongoose/mongodb conn, n/w, file calls etc.
│   ├── node_modules (backend)
│   ├── .env.example (backend)
│   ├── .travis.yml (backend)
│   ├── babel.config.js (backend)
│   ├── jest.config.js (backend)
│   ├── .gitignore (backend)
│   ├── Package.json (backend) - including package-lock.json, scripts (dev/prod)
│   └── README.MD (backend)
├── node_modules (root)
├── Package.json (root) : shared b/w both FE & BE - including package-lock.json
├── License (root)
├── npmGpkg (root)
├── .gitignore (root)
└── README.MD (root)
```

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the asyncWrapTC utility wrapper, which forwards the error.

```javascript
import { asyncWrapTC } from "../utils/tryCatchAsync.helper.js";

// CREATE (POST) : Creates a new user.
const createUser = asyncWrapTC(async (req, res) => {
  await userService.addUser(req, res);
  return res.status(httpStatusCodes.CREATED).send("New User Created!!");
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (asyncWrapTC will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
};
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");

const router = express.Router();

router.post(
  "/users",
  validate(userValidation.createUser),
  userController.createUser
);
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints (Routes)

List of available routes:

**AuthN routes (JWT)**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/logout` - logout\
`POST /v1/auth/refresh-tokens` - refresh auth tokens\
`POST /v1/auth/home-jwt` - JWT homepage after auth

**AuthN routes (Google OAuth 2.0)**:\
`GET /SignInWithGoogleOAuth2Button` - Sign In Button (index.html) (Should be added to Redirect uri in Google Cloud console creds)\
`GET /v1/auth/loginGoogleOAuth2` - Callback URL (Should be added to Redirect uri in Google Cloud console creds)\
`GET /logoutGoogleOAuth2` - Delete cookie and destroy session (backend only : bug -> back btn will still works)\
`GET /home` - Protected route will be called after succesful login via Google OAuth2

**User routes**:\
`POST /v1/users` - create a user\
`GET /v1/users` - get all users

**Other routes**:\
`GET /` - Default Route will serve index.html via express.static\
`GET /favicon.ico` - just to ignore favicon error in logs

## Authentication (AuthN : JWT & Google OAuth 2.0)

To require authentication for certain routes, you can use the `auth` middleware.

```javascript
const express = require("express");
const auth = require("../../middlewares/auth");
const userController = require("../../controllers/user.controller");

const router = express.Router();

router.post("/users", auth(), userController.createUser);
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the register (`POST /v1/auth/register`) or login (`POST /v1/auth/login`) endpoints. The response of these endpoints also contains refresh tokens (explained below).

An access token is valid for 30 minutes. You can modify this expiration time by changing the `JWT_ACCESS_EXPIRATION_MINUTES` environment variable in the .env file.

**Refreshing Access Tokens**:

After the access token expires, a new access token can be generated, by making a call to the refresh token endpoint (`POST /v1/auth/refresh-tokens`) and sending along a valid refresh token in the request body. This call returns a new access token and a new refresh token.

A refresh token is valid for 30 days. You can modify this expiration time by changing the `JWT_REFRESH_EXPIRATION_DAYS` environment variable in the .env file.

## Authorization (AuthR : RBAC)

The `auth` middleware can also be used to require certain rights/permissions to access a route.

```javascript
const express = require("express");
const auth = require("../../middlewares/auth");
const userController = require("../../controllers/user.controller");

const router = express.Router();

router.post("/users", auth("manageUsers"), userController.createUser);
```

In the example above, an authenticated user can access this route only if that user has the `manageUsers` permission.

The permissions are role-based. You can view the permissions/rights of each role in the `src/config/roles.js` file.

If the user making the request does not have the required permissions to access this route, a Forbidden (403) error is thrown.

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require("<path to src>/config/logger");

logger.error("message"); // level 0
logger.warn("message"); // level 1
logger.info("message"); // level 2
logger.http("message"); // level 3
logger.verbose("message"); // level 4
logger.debug("message"); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## Custom Mongoose Plugins

The app also contains a custom mongoose plugins that you can attach to any mongoose model schema. You can find the plugins in `src/models/plugins`.

```javascript
const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const userSchema = mongoose.Schema(
  {
    /* schema definition here */
  },
  { timestamps: true }
);

userSchema.plugin(toJSON);

const User = mongoose.model("User", userSchema);
```

### toJSON

The toJSON plugin applies the following changes in the toJSON transform call:

- removes \_\_v, createdAt, updatedAt, and any schema path that has private: true
- replaces \_id with id

## Contributing

Contributions are always Welcome. Make a Pull Request (PR) or raise an issue. Will review them when time permits.

## FAQ

#### Is this CRUD App for commercial use ?

Nope. But if anyone wants to use it in their project as boilerplate etc. feel free to use.

#### Is this your Personal project ?

Yup, to clear out my basics of fullstack web app dev.

## Feedback & Support

If you have any feedback, please reach out to me at sonimonish00[at]gmail[dot]com

## 🚀 About Me : Hi, I'm Monish! 👋

🧠 I'm currently learning backend/full stack development.

## 🛠 Skills

Python, Javascript (Node, React), HTML, CSS

## 🔗 Contact Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://sonimonish00.github.io/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/monishsoni)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/MonishSoni95)
