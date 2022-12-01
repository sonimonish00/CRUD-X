
# CRUD-X

A basic CRUD web application using [X]ERN stack.

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Tech Stack (FE + BE/DB) : [X]ERN 

**Architectural :** monolith | MVC-3 tier | agile | TDD

**Frontend - client | static-site | web-asset | ui:** Reactjs

**Backend - Webserver/service/host/api | app-server:** Nodejs/express

**DBaaS [X] :** mongodb atlas | elephantsql (postgre) | cockroachlab | astra (cassandra) | planetscale (mysql) | elasticloud

Extra (Just FYI) : monorepo, microservice/frontend, web & service [workers](https://web.dev/workers-overview)/worklets/cron-job/schedulers, HTTP web server - Ngnix, Apache

## Major Features

- Multi-AuthN/AuthR (Cookies Vs. JWT) [Authorization & OAuth2.0 Support]
- Multi-Products CRUD
- Multi-DB & Multi-Env (Dev/Prod)
- Cross platform & responsive web design


## Installation & Deployment (Local)

**For Fullstack (MERN) :** npm **FSUpdatePkgs** - to update local pkg to latest ver **PENDING** [Link Here](https://stackoverflow.com/a/34295664)
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


## Dev. env. setup : IDE | vcs/scm | deployment | devops

**Local IDE :** VSCode 
  - **VSCode :** (See below Linter/Formatter section too) 
    - Preq. - Git & Node (npm)
    - [Git-bash](https://stackoverflow.com/a/41199625) : NPM global pkgs **manual backup - npmGpkg** File (see CRUD-X Repo)
    - Ext. : Setting Sync on via Github A/C (update outdated npm global & local pkg manually | VScode ext. autoupdate)
  - **Online Code Snippet/Sandbox :** carbon.now.sh, Codepen.io

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

## Linter | Formatter etc. (VSCode Setup - MERN stack)
NOTE : js/jsx & ts/tsx is not diff. it's just use to denote that js/ts is for normal & jsx/tsx is for component. But .cjs & .mjs are diff.
NOTE : For browser default is CJS in html <script> tag, but if ur using MJS then u need to mention "type=module" in <script> tag. As we are using react here, we dont need to worry as react will build html for us. 
  - **Frontend (React v18+)** : React is defaulted to ES6/MJS module system.
    - **Current** : Javascript (ES6+)
      - Filename : .js/.jsx (js/jsx are equiv. here but as mentioned in note above, we use it for diff. purpose)
      - Module system : ES6 (.mjs) => import/export (we don't need to have .mjs extension bcz react CRA defaults to mjs so js/jsx=mjs)
      - VS Code extension (Global) :
        - Linter : ESlint (CRA/Webpack includes eslint settings inbuilt, still we install eslint)
        - Formatter : Prettier
        - Config folder (**Optional** - to locally override) : .eslintrc.js, .prettierrc
      - NPM Packages (Global/Local) : Prerequiste -> Node/npm 
        - @react, @react-dom etc.
    - **Future** : Typescript (CRA --template typescript)
      - Filename : .ts/.tsx (ts/tsx are equiv. here but as mentioned in note above, we use it for diff. purpose)
      - Module system : ES6 (.mjs) => import/export (js/jsx=mjs=ts/tsx, so we use ts/tsx only)
      - VS Code extension (Global) : 
        - Linter : ESlint (.tslint.json is deprecated in favor of eslint)
        - Formatter : Prettier
        - Config folder (**Optional** - to locally override) : .eslintrc.js, .prettierrc, tsconfig.json (`tsc` compiler modify/don't know optional or not)
      - NPM Packages (Global/Local) : Prerequiste -> Node/npm 
        - @typescript, @types/node, @types/react, @types/react-dom, @types/jest etc. (Other/extra : @ts-node)
  - **Backend (Node v18+)** : Node is defaulted to commonJS/js/cjs module system => require/module.exports
    - **Current** : Javascript (ES6+) // Node is defaulted to CJS, but here we use MJS so following settings will change.
      - Filename : .js/.mjs (Package.json => "type": "module") // Both js/mjs are equiv here bcz "module" is mentioned in package.json, we stick to .js
      - Module system : ES6 (js/mjs) => import/export // We r using "mjs", but if you wanna use "cjs" somewhere add "abc.cjs" ext. explicitly
      - VS Code extension (Global) :
        - Linter : ESlint
        - Formatter : Prettier
        - Config folder (**Optional** - to locally override) : .eslintrc.js, .prettierrc
      - NPM Packages (Global/Local) : Prerequiste -> Node/npm
        - @eslint, @eslint-cli etc. 
    - **Future** : Typescript [see](https://www.youtube.com/watch?v=H91aqUHn8sE&t=15s)
      - Filename : .ts (Package.json => "type": "module" | `tsc` compiler : a.ts => a.js | node a.js)
      - Module system : ES6 (.mjs) => import/export (js=mjs=ts, so we use ts only)
      - VS Code extension (Global) :
        - Linter : ESlint (.tslint.json is deprecated in favor of eslint) (Also NPM global : typescript | types/node | eslint | eslint-cli)
        - Formatter : Prettier
        - Config folder (**Optional** - to locally override) : .eslintrc.js, .prettierrc
          - .tsconfig.json (To configure behaviour of `tsc` compiler - Don't know whether its optional or not)
            - module = NodeNext for MJS & commonJS for CJS // Here we using MJS, so NodeNext
            - moduleResolution = NodeNext // Also while importing u need to have .js extn. for MJS & .cjs for CJS
        - NPM Packages (Global/Local) : Prerequiste -> Node/npm
          - @typescript, @types/node etc. (Other/extra : @ts-node)

## File-folder (project) structure : separation of concern
 - **CRUD-X (Root Folder)**
   - **Client** [Feature/funct./comp. driven] (Other - group by file type, pages with global folder/colocation of related comp. etc.)
      - public
      - src
        - Assets : images, static file etc. 
        - Components (Templates/Props)
          - core : common and basic components, such as Home,Menu components which are common to all other comp.
          - post : post-related components
          - user : user-related components
          - componentFolderN : and so on....
        - Pages
        - Config (To overwrite global configs - .eslintrc.js, .prettierrc, .editorconfig, webpack.config.js - CRA/webpack already has eslint so gen. we dont include it)
        - i18n
        - navigation : Router (Navigation) -> react-router-dom
        - redux : actions, reducers, store.js [Redux Toolkit -> Redux & Thunk Dev tools]
        - Services - API
          - auth : auth-related components and helper code, routes etc.
        - styles
        - utils - Helper methods, validations etc. 
        - __tests__ : Jest Framework (Unit testing)
        - index.js ===> Main entry point for react
      - node_modules
      - .gitignore
      - Package.json (frontend)
      - README.MD
   - **Server** [Separation based on functionality]
      - config (overwrite global configs : .eslintrc.js, .prettierrc, .editorconfig, webpack.config.js etc.)
      - controllers
      - database
      - env
      - middlewares
      - models (ORM)
      - routes
      - tests
      - util
      - server.js ===> Main entry point for nodejs server
      - node_modules (backend)
      - .gitignore (backend)
      - Package.json (backend)
      - Readme.MD (backend)
      - node_modules
      - .gitignore
      - Package.json (backend)
   - Package.json (root) - shared b/w both FE/BE
   - License
   - .gitignore
   - Readme.MD

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`PORT`

`MONGO_URL`

## Demo

![](https://media1.giphy.com/media/wAvzlIA6cRPeDyRjY9/giphy.gif?cid=790b7611de9cb72ce5aa85de257c1cec75ef4ba7982098bf&rid=giphy.gif&ct=g)


## Contributing

Contributions are always Welcome. Make a Pull Request (PR) or raise an issue. Will review them when time permits.


## FAQ

#### Is this CRUD App for commercial use ?

Nope.

#### Is this your Personal project ?

Yup, to clear out my basics of fullstack web app dev. 


## Feedback & Support

If you have any feedback, please reach out to me at sonimonish00[at]gmail[dot]com


## 🚀 About Me : Hi, I'm Monish! 👋
🧠 I'm currently learning backend/full stack development.


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://sonimonish00.github.io/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/monishsoni)

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/MonishSoni95)


## 🛠 Skills
Python, Javascript (Node, React), HTML, CSS

