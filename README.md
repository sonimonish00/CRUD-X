
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


## Installation

Install `CRUD-X` with npm

```bash
  cd CRUD-X
  npm install
```

## Development Env. Setup Workflow : IDE | VCS/SCM | Deployment/Devops/CI-CD

**Local IDE :** VSCode

**Browser :** Mozilla | Chrome (Extension - React devtools, Redux devtools)

**VCS/SCM :** Github

**Cloud IDE (Remote) :** Github Codespace (Other - Repl.it [Mobile App/Hosting])

**Devops (CI/CD) :** Github Actions

**Deployment (PaaS) :** Vercel (Frontend) | Render.com (Backend) - For DB will use DBaaS.
 - Vercel could be used for backend deployment via : 
   - Serverless Function (i.e. rewrite your backend to make it serverless)
   - Vercel's NEXTJS Framework

**Other :**
 - **Code Snippet/Sandbox :** carbon.now.sh, Codepen.io
 - **DBaaS :** MongoDB Atlas | ElephantSQL(Postgre) | Cockroachlab | Astra(Cassandra) | PlanetScale(MySQL) | ElasticCloud


To deploy this project locally run

**For Backend (localhost:3000/)** : 

```bash
  npm start
```

**For Frontend** build the React Project: 

```bash
  npm run build
```

## Folder (Project) Structure : Separation of Concern
 - CRUD-X (Root Folder)
   - Client (Frontend Folder)
      - node_modules
      - .gitignore
      - Package.json (frontend)
   - Server (Backend Folder)
      - node_modules
      - .gitignore
      - Package.json (backend)
   - Package.json (root) - shared b/w both FE/BE
   - License
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

