import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing'
import { RecipeOptions } from './recipe.schema'
import * as path from 'path'
import { RecipeEnum } from './recipe.factory'

// TODO IMPROVE TESTING WITH THE APP MODULE METADATA AND THE PACKAGE JSON SCRIPTS
describe.skip('Recipe Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json')
  )

  const expectedFiles = [
    '/src/ping/ping.controller.ts',
    '/src/ping/ping.service.ts',
    '/src/prisma/prisma.module.ts',
    '/src/prisma/prisma.service.ts',
    '/prisma/schema.prisma',
    '/docker/.dockerignore',
    '/docker/Dockerfile.pg',
    '/docker/docker-compose.yaml',
    '/docker/scripts/create-user.sql',
    '/docker/scripts/initdb.sh'
  ]

  it('should generate files needed for the prisma recipe', async () => {
    const options: Partial<RecipeOptions> = {
      recipe: RecipeEnum.Prisma
    }

    const tree: UnitTestTree = await runner.runSchematicAsync('recipe', options).toPromise()
    const files: string[] = tree.files
    expect(files.sort()).toEqual(expectedFiles.sort())
  })
})
