# Prisma

Prisma is an open-source ORM for Node.js and TypeScript. It is used as an alternative to writing plain SQL, or using another database access tool such as SQL query builders (like knex.js) or ORMs (like TypeORM and Sequelize). Prisma currently supports PostgreSQL, MySQL, SQL Server, SQLite and MongoDB (preview).

While Prisma can be used with plain JavaScript, it embraces TypeScript and provides a level to type-safety that goes beyond the guarantees of other ORMs in the TypeScript ecosystem. You can find an in-depth comparison of the type-safety guarantees of Prisma and TypeORM here.

## Getting started
In this section, you will learn how to get started with NestJS and Prisma through a basic implementation for `Ping` module that can read and write data in a database.

This recipe adds all Prisma-related dependencies alongside Postgres as the default database engine. Also, a global Prisma module is created and added to the `app.module`. At the same time the existing `ping.service` and `ping.controller` are overridden to make use of the Prisma implementation.

To have a ready-to-run environment a new `docker-compose.yml` and `DockerFile` files are already created with the configuration needed to run the application and connect to the database.

# Prerequisites

* nest-cli installed
* ifit-nestjs-schematics package installed
* yarn installed globally (since it will be used to install dependencies using the schematics)
* Docker and docker-compose (since it will be used to start up the database layer) for more information about installing [Docker Desktop](https://www.docker.com/products/docker-desktop)
* An application already generated usign `ifit-nestjs-schematics`

## How to add Prisma recipe

```bash
# To add a recipe into an existing app
nest g -c ifit-nestjs-schematics recipe

# In addition to the recipe schematic, you may also use the aliases below
nest g -c ifit-nestjs-schematics rec

nest g -c ifit-nestjs-schematics r

```

# What's included in the Prisma recipe?

By default the generated Prisma recipe will include the following features:

* Global Prisma Module with the PrismaClient implementation
*  A `schema.prisma` file with the `Ping` model and the configuration needed to generate corresponding types.
* Ready to work `Docker` related files containing pre-filled information to use postgres as a database to persist data.
* An Updated `package.json` file with the necessary dependencies and scripts to run the application.
* An Updated `Ping` Module that uses the new PrismaService.


The default project structure with Prisma recipe will look like so:


```
├── docker
│ ├── scripts
│ │ ├──create-user.sql
│ │ └──initdb.sh
│ ├──.dockerignore
│ ├──docker-compose.yaml
│ └──Dockerfile.pg
├── prisma
│ └──schema.prisma
├── src
│ ├── logger
│ │ ├──logger.module.ts
│ │ ├──logger.service.ts
│ │ └──logger.service.spec.ts
│ ├── ping
│ │ ├──ping.module.ts
│ │ ├──ping.controller.ts
│ │ └──ping.service.ts
│ ├── prisma
│ │ ├──prisma.module.ts
│ │ └──prisma.service.ts
│ ├── app.controller.ts
│ ├── env.types.ts
│ ├── env.validation.ts
│ ├── app.service.ts
│ ├── main.ts
│ └── swagger.configuration.ts
├── .env
├── .gitignore
├── .nvmrc
├── .env.example
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

## Running the app

You should be able to simply run the project using ```yarn start``` or ```yarn start:dev```. This will spin up the database using docker and the application.