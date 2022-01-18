# App Template

This section describes how to get started with the default app template and what is included in the starter app using the `ifit-nestjs-schematics` package.

# Prerequisites

* nest-cli installed
* ifit-nestjs-schematics package installed
* yarn installed globally (since it will be used to install dependencies using the schematics)

# How to generate an app?

After installing the `nest-cli` and the `iFit-nestjs-schematis` package globally, you will need to run the following command to create an app.

```bash
# Declaring the name of the app
nest g -c ifit-nestjs-schematics app MY_EXAMPLE_APP
# Or
# Without declaring the name of the app
nest g -c ifit-nestjs-schematics app

# You can also use the aliases below instead of the app flag
nest g -c ifit-nestjs-schematics a MY_EXAMPLE_APP
nest g -c ifit-nestjs-schematics application MY_EXAMPLE_APP

# You can also use the name of the current working directory by using the dot notation
nest g -c ifit-nestjs-schematics app .
```

> NOTE: If no name is provided to the app when calling the cli, you will be prompted to input the name of the project. If you still don't provide a name for the project, the default name will be used `ifit-nest-template`.

Once the process starts, the base files of a `NestJS` app will be generated and installed using `yarn`.

# What's included in the schematics?

By default the generated app will include the following features:
* Env validation using `class-validator`
* Swagger configuration to generate a `swagger.yml` file.
  * > Refer to: [Types and Parameters](https://docs.nestjs.com/openapi/types-and-parameters)
* A ready to work `.env` file containing pre-filled non-sensitive information
* A global validation pipe to use `class-validator` to validate incoming data in the controllers.
* A Ping Module that contains a `database agnostic` service that returns mock data.
  * > To include a database connection refer to the [prisma recipe](./recipes/prisma)
* An opinionated code linter `ts-standard`. For better integration with your development environment and auto-correction feel free to install the VSCode `standard-js` plugin.
* A custom logger module that uses `@ifit/llama` to log information to `rapid7`.
  * > The default behavior of the `LLAMA_LE_TOKEN` and `LLAMA_LOG_LEVEL` variable still applies. for more information on those, feel free to refer to [llama](https://github.com/ifit/llama)

The default project structure will generate a file tree like the following:

```
├── src
│   ├── logger
│   │   ├──logger.module.ts
│   │   ├──logger.service.ts
│   │   └──logger.service.spec.ts
│   ├── ping
│   │   ├──ping.module.ts
│   │   ├──ping.controller.ts
│   │   └──ping.service.ts
│   ├── app.controller.ts
│   ├── env.types.ts
│   ├── env.validation.ts
│   ├── app.service.ts
│   ├── main.ts
│   └── swagger.configuration.ts
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

# Running the template

Since the starter template does not include any database layer, you should be able to simply run the project using ```yarn start``` or ```yarn start:dev```. This will spin up the server and you may start the development of your application using the [recipes](./recipes) schematics or following the `NestJS` documentation.
