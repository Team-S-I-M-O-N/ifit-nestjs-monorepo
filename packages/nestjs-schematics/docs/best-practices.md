# Best practices

This is a collection of best practices, when using the `ifit-nestjs-schematics` package or the `nest-cli` to create controllers, modules, services, etc.

# 1. NestJS is domain driven 

Keep in mind that nest is built around the `domain-driven` architecture, meaning that when using the `nest-cli`, by default nest will generate a folder that will contain anything related to that specific domain, for example:

Running the command:
```bash
nest g module workout
```

Nest will generate, a new folder called `workout`, a file called `workout.module.ts` and add it the to the app module. Adding additional classes for the workout domain should only be done inside the `workout` folder. For example:

```
workout.model.ts
workout.service.ts
workout.types.ts
workout.dto.ts
workout.controller.ts
...etc
```

Following the example above, we could replicate this to create any other domain for our application. which leads us to the second best practice.

# 2. Always favor the usage of the nestjs-cli or the ifit-nestjs-schematics package to add new functionality to your app

Using the cli will ensure two things:

1. You adhere to the domain driven predisposition of NestJS
2. You prevent import/dependencies errors in your files.

> ### What do we mean by import errors? <br />
> Creating a module using the schematics will ensure your new module is included in the app module by default, the dependencies of that recipe are installed and added to the package.json, a newly created service is added to the corresponding module that will contain that service.

Additionally to the benefits outlined above, the schematics are designed to automatically create unit tests for controllers and services, which could save some time creating these files.

> For more information on the `nest-cli` you may refer to: [nest-cli official documentation](https://docs.nestjs.com/cli/overview)

> NOTE: If the functionality that you want to add to your application is not covered in the schematics, NestJS provides all the information to include new `recipes` and `techniques` to your application. Feel free to visit the [official NestJS documentation](https://docs.nestjs.com/) or submit a `feature-request` to the `ifit-nestjs-schematics` package.

# 3. Always use the 3-Tier architecture to add new functionality to your application

Isolating the logic of `services`, `controllers`, and the `data-access-layer` is part of the core of nest-js, using the `ifit-nestjs-schematics` or `nest-cli` will facilitate following this pattern.

```
  Controller => Service => Data Access Layer (ODM)
```

For more information on how this pattern works, feel free to review the `ping` module which outlines the correct usage of `modules`, `controllers`, and `services`.

To create such pattern from scratch using the `nest-cli` you may use the following commands.

```bash
# create the module
nest g module ping
# create the controller
nest g controller ping
# create the service
nest g service ping
```

Then these can be coupled together using dependency injection, as it is outlined in the ping example. To add a `data access layer` to the mix, this can be done automatically by using [recipes](./recipes) in the `ifit-nestjs-schematics` package or following the recipes section in the [NestJS official documentation](https://docs.nestjs.com/).

# 4. Unit tests should live in the same folder as the file it is testing

While this is a very opinionated best practice, it is a pattern that comes by default in `nestjs`. The creation of unit test for your controllers and services should already be covered when using the `schematics` through the CLI; however, when creating custom files, remember to always include a unit test following the `domain.role.spec.ts` naming convention, for example:

```
workout.controller.spec.ts
workout.service.spec.ts
workout.utilities.spec.ts
```

# 5. Use class-validator to validate incoming data through decorators

`class-validator` is a library that allows validating JSON data through decorators. There are a handful of decorators available to ease the burden of ensuring the data received is in the shape and expected format.

To create a DTO we will need to create a class for the desired operation following the naming convention provided above. For example, creating a DTO for the `createTrainer` endpoint in the trainer controller will look like so:

1. Create the file inside the corresponding domain trainer/
```bash
createTrainer.dto.ts
```

2. Populate the file using decorators
```JS
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTrainerDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
```

3. Use it in your controller
```JS
@Post()
createTrainer(@Body() createTrainerDTO: CreateTrainerDTO) {
  return 'This action adds a new Trainer';
}
```

The code above will ensure the integrity of the data before it even reaches the controller. The `ifit-nestjs-schematics` template already has all the configuration needed for this to work out of the box. 

If you would like to provide a custom error message or create a custom decorators, feel free to review the [class-validator](https://github.com/typestack/class-validator) documentation for advance use.

# 6. Use swagger decorators as you build your app

This is probably one of the most tedious parts of creating a server-side application; however, `nest-js` exposes a suite of decorators to facilitate the generation of a swagger file to document the usage of every route of your application.

Taking the `TrainerCreateDTO` example from above, we could add the necessary `Open API` documentation by adding the following decorators:

```JS
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTrainerDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
```

The code above, is the simplest example of using decorators to create `Open API` documentation. for a full list of decorators and what they do, see the [full list of decorators](https://docs.nestjs.com/openapi/decorators) available in the `nestjs` official documentation.

# 7. Favor useClass configuration over standard configuration

When adding a new module that receives a configuration object avoid loading the module with a configuration object as it clutters the module is being imported into and dependency injection could get tedious to implement.

for example:

Instead of using:
```JS
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        dbName: 'workout-store',
        useUnifiedTopology: true,
        // ...All other mongo options
      }),
      inject: [ConfigService],
    });
  ]
})
appModule {}
```

You may create a class that covers the needs of the module
```JS
@Injectable()
class MongooseConfigService implements MongooseOptionsFactory {
  @Inject()
  private readonly configService: ConfigService<IEnv>

  createMongooseOptions (): MongooseModuleOptions {
    const DB_URL = this.configService.get('DB_URL')
    const ENV = this.configService.get('NODE_ENV')

    return {
      uri: DB_URL,
      useNewUrlParser: true,
      dbName: ENV === 'test' ? 'test' : 'm3',
      useUnifiedTopology: true
    }
  }
}

export const DBConnection = MongooseModule.forRootAsync({
  useClass: MongooseConfigService
})
```

And then import it to the app module like so:
```JS
@Module({ imports: [DBConnection] })
appModule {}
```

# Final Words

There are many other great practices outlined in the NestJS documentation that are not covered in this file, if you would like to add any other recommendation, feel free to submit a pull request or visit the NestJS official documentation.