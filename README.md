# TippetCMS - A static CMS over GatsbyJS

Simple starter for quickly getting started with Angular - Nest projects. Api and app are not depended on each other for easier scalability and flexibility. For app state management NGXS is used. Also uses lerna for scafolding and versioning. Aims to be as simple as possible so you can configure most stuff the way you want to.

## Before you start
- You need [Node.js](https://nodejs.org/) installed on your machine to setup and run this project.
- This project is setup with [Lerna](https://lernajs.io/). Each folder under `packages` folder is a separate project
- There are three packages in total, `app` the frontend, `api` the backend and `shared` for shared models

## Setup and run
- Instal Lerna globally

```
npm i -g lerna
```

- Clone the project

```
git clone https://github.com/ksiabani/tippetcms.git
```

- Cd to each package separately and install dependencies

```
npm install
```

- From the root of the project run

```
npm start
```

- Have fun!

## Run the tests

Cd to each project separately and run `npm start`

## Built With

- [Angular](http://www.dropwizard.io/1.0.2/docs/) - Angular 6. No intros needed i guess :)
- [Nest](https://docs.nestjs.com/) - Node.js framework in Typescript with influences from Angular ;)
- [NGXS](https://ngxs.gitbook.io/ngxs/) - State managment alternative to NGRX. Less boilerplate
- [Lerna](https://lernajs.io/) - Scafolding and versioning tool

## Something not right?
Please open an issue [here](https://github.com/ksiabani/tippetcms/issues)

## Authors

- **Kostas Siabanis**
