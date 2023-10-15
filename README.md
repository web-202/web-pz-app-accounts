# Practical lesson  app-accounts
> In this lesson students should create SPA application using one of the framework from the list: ReactJs, Angular, VueJs



https://user-images.githubusercontent.com/10829855/140733044-b7180fd0-eebc-4711-af99-3a516f16f55a.mov


### Acceptance criteria 
 - Create the list of account app according to video above
 - Adaptive responsive layout for different devices 
 - Project should have production and development build
 - Use TypeScript

### Getting started

Install JSON Server

```
npm install -g json-server
```

Start JSON Server

```bash
json-server --watch ./db/db.accounts.json
```
### Routes

Based on the previous `./db/db.accounts.json` file, here are all the default routes. You can also add [other routes](#add-custom-routes) using `--routes`.

### Plural routes

```
GET    /accounts
GET    /accounts/1
POST   /accounts
PUT    /accounts/1
PATCH  /accounts/1
DELETE /accounts/1
```

### Singular routes

```
GET    /accounts
POST   /accounts
PUT    /accounts
PATCH  /accounts
```

### Useful links
* [учебник по JavaScript](https://learn.javascript.ru/).
* [json-server](https://www.npmjs.com/package/json-server).
* [create-react-app](https://www.npmjs.com/package/create-react-app).
* [Getting started with Angular](https://angular.io/start).
* [Getting started with ReactJs](https://reactjs.org/docs/getting-started.html).
* [Getting started with Vue.js](https://v1.vuejs.org/guide/).
  
  

