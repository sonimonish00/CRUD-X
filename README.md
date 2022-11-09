
# CRUD-X

A basic CRUD web application using [X]ERN stack.

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Tech Stack : [X]ERN -> Frontend + (Backend + DB) = Full stack web application (Monolith Arch. - 3 Tier | MVC | Agile/TDD)

**Client/Frontend/Static-site/Web-asset:** ReactJS (UI Library)

**Web-server/Backend/Web-host/Web-API/Web-service/App-server:** NodeJS/runtime-engine & Express-FW

Note (Tech-stack/Arch. concepts) : monorepo, microservice, microfrontend etc. 

Note (Backend concepts) : Web & Service [workers](https://web.dev/workers-overview)/worklets/cron-job/schedulers, HTTP web server - Ngnix, Apache.

**Multi-DB/DB-driver/Datastore/Data-service [X - SQL/NoSQL]:** mongodb, mysql, elasticsearch, cockroachdb, cassandra.

## Features

- Multi-Authentication (Cookies Vs. JWT)
- Multi-Products CRUD
- Authorization & OAuth2.0 Support
- Cross platform & responsive web design


## Installation & Deployment (Local)

**For Fullstack (MERN) :**

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

**For Frontend only (React/CRA) :**

```bash
  cd CRUD-X/client
  npm install
  npm start (For Development - localhost)
  npm build (For production)
```


## Development Env. Setup Workflow : IDE | VCS/SCM | Deployment/Devops/CI-CD

**Local IDE :** VSCode (Extension - DotENV, React/Redux & JS(ES6) snippet, ES/TSlint, Jest, Material Icon, Live server, MongoDB, Prettier

**VSCode (Global Install) :** node, npm, ncu, nvm, powershell (updated latest versions)

**Browser :** Mozilla | Chrome (Extension - React devtools, Redux devtools)

**VCS/SCM :** Github

**Cloud IDE (Remote) :** Github Codespace (Other - Repl.it [Mobile App/Hosting])

**Devops (CI/CD) :** Github Actions

**Deployment (PaaS) :** Vercel (Frontend) | Railway.app (Backend) - DB (MongoDB Atlas)
 - Vercel could be used for backend deployment via (But will use it for frontend only) : 
   - Serverless Function (i.e. rewrite your backend to make it serverless)
   - Vercel's NEXTJS Framework

**Other :**
 - **Code Snippet/Sandbox :** carbon.now.sh, Codepen.io
 - **DBaaS :** MongoDB Atlas | ElephantSQL(PostgreSQL) | Cockroachlab | Astra(Cassandra) | PlanetScale(MySQL) | ElasticCloud

## File/folder (Project) Structure : Separation of concern
 - **CRUD-X (Root Folder)**
   - **Client** [Feature/funct./component driven] (group by file type, pages with global folder/colocation of related comp. is not used)
      - public
      - src
        - Assets : images, static file etc. 
        - Components (Templates/Props)
          - core : common and basic components, such as Home,Menu components which are common to all other comp.
          - post : post-related components
          - user : user-related components
          - componentFolderN : and so on....
        - Pages
        - Config
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
      - config
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

`API_KEY`

`ANOTHER_API_KEY`


## API Reference

#### To Signup

```http
  GET /register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `None` | `string` | To signup user |

#### To Login

```http
  GET /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `None`      | `string` | To Login user |




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

