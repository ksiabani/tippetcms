# Angular Nest Simple Starter

Simple starter for quickly getting started with Angular - Nest projects. Api and app are not depended on each other for easier scalability and flexibility. For app state management NGXS is used. Also uses lerna for scafolding and versioning. Aims to be as simple as possible so you can configure most stuff the way you want to.

## Getting Started

You need lerna installed on your machine for this project to run.

```
npm i -g lerna
```

Assuming you already have node installed you can clone the project.

```
git clone https://github.com/momegas/angular-nest-simple-starter
```

## Running the tests

You can run the tests on each project seperately the tradicional way (`cd in package` and `npm test`) or you can do what i did with `npm start`and set up the tests to run for all projects (have a look at the root package.json)

## Built With

- [Angular](http://www.dropwizard.io/1.0.2/docs/) - Angular 6. No intros needed i guess :)
- [Nest](https://docs.nestjs.com/) - Node.js framework in Typescript with influences from Angular ;)
- [NGXS](https://ngxs.gitbook.io/ngxs/) - State managment alternative to NGRX. Less boilerplate
- [Lerna](https://lernajs.io/) - Scafolding and versioning tool

## Versioning

Have a look at lerna docs to see how versioning can be handled

## Authors

- **Megaklis Vasilakis** - [momegas.com](http://momegas.com)
