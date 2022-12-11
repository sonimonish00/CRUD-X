
# CRUD-X

A basic CRUD web application using [X]ERN stack.

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Tech Stack (FE + BE/DB) : [X]ERN 

**Architectural :** Agile | Monolith | MVC (Future PENDING - [Component based](https://github.com/goldbergyoni/nodebestpractices#-11-structure-your-solution-by-components) & TDD)

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
        - Settings.json	Workbench : Search "Preferred Color Theme"
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

## Linter | Formatter etc. [Clean Code Style/Best Practises](https://github.com/goldbergyoni/nodebestpractices#3-code-style-practices)
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

## File-folder (project) structure : separation of concern
 - **CRUD-X (Root Folder)**
   - **Client** [Feature/funct./comp. based] (Other - MVC, group by file type, pages with global folder/colocation of related comp. etc.)
      - public
      - src
        - Assets : images, static file etc. 
        - Components (Templates/Props)
          - core : common and basic components, such as Home,Menu components which are common to all other comp.
          - post : post-related components
          - user : user-related components
          - componentFolderN : and so on....
        - Pages
        - Config (To overwrite global config - .eslintrc.js, .prettierrc, .editorconfig - CRA/webpack already has eslint so gen. we dont include it)
        - i18n
        - navigation : Router (Navigation) -> react-router-dom
        - redux : actions, reducers, store.js [Redux Toolkit -> Redux & Thunk Dev tools]
        - Services - API
          - auth : auth-related components and helper code, routes etc.
        - styles
        - utils - Helper methods, validations etc. 
        - __tests__ : Jest Framework (Unit testing)
        - index.js ===> Main entry point for react
      - node_modules (frontend)
      - .gitignore (frontend)
      - Package.json (frontend) - including package-lock.json
      - README.MD (frontend)
   - **Server** [Separation based on functionality - [MVC](https://www.youtube.com/watch?v=bQuBlR0T5cc) or Technical Role based => FUTURE PENDING : [Component based](https://github.com/goldbergyoni/nodebestpractices#-11-structure-your-solution-by-components)]
      - app 
        - controllers -> user.controllers.js (route-handler callback fns.)
        - middlewares -> checkAuth.middleware.js (In between functions : logging, authentication etc.)
        - models (ORM/MongoDB) -> user.models.js
        - routes -> user.routes.js (RESTful API routes - CRUD)
        - tests -> Unit & integration test, api test/super test etc. 
        - util (folder)
        - services (folder) - 3rd party email, payment gateway etc. 
          - NOTE : It cud also act as middleman b/w controller & database(model). ie. controller will call service which will manipulate DB & return data back to controller [Link 1](https://youtu.be/bQuBlR0T5cc?t=720), [Link 2](https://github.com/machadop1407/MVC-API-Example-Express-NodeJS)
        - index.js -> Application code (MVC part) 
      - [config](https://github.com/goldbergyoni/nodebestpractices#-15-use-environment-aware-secure-and-hierarchical-config) (overwrite global configs FUTURE PENDING : .eslintrc.js, .prettierrc, .editorconfig, webpack.config.js etc.)
        - db.config.js (For MongoDB Atlas connection - Could also contain N/W, File configs etc.)
      - env -> .env, .env.development etc.
      - server.js ===> Main entry point for nodejs server - contains http server, mongoose/mongodb conn, n/w, file calls etc. 
      - node_modules (backend)
      - .gitignore (backend)
      - Package.json (backend) - including package-lock.json, scripts (dev/prod)
      - README.MD (backend)
   - node_modules (root)
   - Package.json (root) : shared b/w both FE & BE - including package-lock.json
   - License (root)
   - npmGpkg (root)
   - .gitignore (root)
   - README.MD (root)

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

