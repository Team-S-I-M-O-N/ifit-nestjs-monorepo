import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { ApplicationOptions } from './application.schema';

describe('Application Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );

  let expectedFiles = [
    '.husky/.gitignore',
    '.husky/_/.gitignore',
    '.husky/_/husky.sh',
    '.husky/commit-msg',
    '.husky/post-checkout',
    '.husky/post-merge',
    '.husky/pre-commit',
    '.lintstagedrc',
    'commitlint.config.js',
    '.gitignore',
    '.nvmrc',
    'env.example',
    '.env',
    'README.md',
    'nest-cli.json',
    'package.json',
    'tsconfig.build.json',
    'tsconfig.json',
    'src/logger/logger.module.ts',
    'src/logger/logger.service.spec.ts',
    'src/logger/logger.service.ts',
    'src/app.module.ts',
    'src/ping/ping.controller.ts',
    'src/ping/ping.service.ts',
    'src/ping/ping.module.ts',
    'src/swagger.configuration.ts',
    'src/main.ts',
    'src/env.types.ts',
    'src/env.validation.ts',
    'test/app.e2e-spec.ts',
    'test/jest-e2e.json'
  ];

  function getFullPathOfExpectedFiles(projectName: string): string[] {
    return expectedFiles.map( file => `/${projectName}/${file}`).sort()
  }

  it('should manage name only', async () => {
    const options: ApplicationOptions = {
      name: 'project',
      architecture: 'REST'
    };

    const tree: UnitTestTree = await runner.runSchematicAsync('application', options).toPromise();
    const files: string[] = tree.files;
    expect(files.sort()).toEqual(getFullPathOfExpectedFiles(options.name));
  });

  it('should manage name to dasherize', async () => {
    const options: ApplicationOptions = {
      name: 'awesomeProject',
      architecture: 'REST'
    };
    const tree: UnitTestTree = await runner.runSchematicAsync('application', options).toPromise();
    const files: string[] = tree.files;
    expect(files.sort()).toEqual(getFullPathOfExpectedFiles("awesome-project"));
  });

  it('should manage destination directory', async () => {
    const directory = 'scope-package';
    const options: ApplicationOptions = {
      name: '@scope/package',
      architecture: 'REST',
      directory
    };
    const tree: UnitTestTree = await runner.runSchematicAsync('application', options).toPromise();
    const files: string[] = tree.files;
    expect(files.sort()).toEqual(getFullPathOfExpectedFiles(directory));
  });
});
