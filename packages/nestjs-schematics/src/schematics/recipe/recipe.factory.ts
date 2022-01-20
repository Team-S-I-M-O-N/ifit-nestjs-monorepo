import { join, Path, strings } from '@angular-devkit/core'
import {
  apply,
  branchAndMerge,
  chain,
  MergeStrategy,
  mergeWith,
  Rule,
  SchematicContext,
  Source,
  template,
  Tree,
  url
} from '@angular-devkit/schematics'
import { RecipeOptions } from './recipe.schema'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType
} from '../../utils/dependencies.utils'
import { prismaDependencies } from './dependencies/prisma'
import { PackageManagerEnum } from '../../types/package-manager.utils'
import { PackageJsonPropertyEnum } from '../../types/package-json-types'
import { addPropertiesToPackageJson } from '../../utils/add-to-package-json'
import { getPackageJsonContent } from '../../utils/package-json.util'
import { ModuleDeclarator, ModuleFinder, ModuleImportOptions } from '../../utils'

export enum RecipeEnum {
  Prisma = 'prisma',
  Authorization = 'authorization'
}
// TODO CREATE FACTORY CLASS TO RETURN CONCRETE RECIPE CREATOR
// TODO CREATORS MUST OPEN TO EXTENSION BUT CLOSE FOR MODIFICATION

export function main (options: RecipeOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Install dependencies using yarn as the default package manager
    context.addTask(
      new NodePackageInstallTask({
        packageManager: PackageManagerEnum.Yarn
      })
    )

    const content = getPackageJsonContent(tree, context)
    options.name = content.name as string

    return branchAndMerge(chain(getRecipeRules(options, tree, context)))
  }
}

function getRecipeRules (options: RecipeOptions, tree: Tree, context: SchematicContext): Rule[] {
  const commonRules = [
    addDeclarationToAppModule(options),
    addDependencies(options)
  ]
  if (options.recipe === RecipeEnum.Prisma) {
    return [
      mergeWith(generate(options), MergeStrategy.Overwrite),
      ...commonRules,
      addCustomScripts(tree, context, options.name)
    ]
  } else {
    return [
      ...commonRules
    ]
  }
}

function generate (options: RecipeOptions): Source {
  return apply(url(join('./templates' as Path, options.recipe)), [
    template({
      ...strings,
      ...options
    })
  ])
}

function addDependencies ({ recipe }: RecipeOptions): Rule {
  return (host: Tree) => {
    if (recipe === RecipeEnum.Prisma) {
      prismaDependencies.forEach((dependency: NodeDependency) => {
        addPackageJsonDependency(host, dependency)
      })
    } else if (recipe === RecipeEnum.Authorization) {
      addPackageJsonDependency(host, { type: NodeDependencyType.Default, name: '@ifit/nestjs-auth-decorators', version: '^0.0.1' })
    }
    return host
  }
}

function addCustomScripts (tree: Tree, context: SchematicContext, name: string): Rule {
  const customScripts = {
    start: 'yarn db-up && nest start',
    'start:dev': 'yarn db-up && nest start --watch',
    'db-migrate': 'npx prisma migrate dev --name init',
    'prisma:generate': 'prisma generate && yarn lint',
    'db-up': `docker-compose -p ${name} -f ./docker/docker-compose.yaml up -d && sleep 3 && yarn db-migrate`,
    'db-down': `docker-compose -p ${name} -f ./docker/docker-compose.yaml down`
  }

  return addPropertiesToPackageJson(PackageJsonPropertyEnum.Scripts, customScripts)
}

function addDeclarationToAppModule ({ recipe }: RecipeOptions): Rule {
  return (tree: Tree) => {
    const appModule = new ModuleFinder(tree).find({
      name: 'app',
      path: 'src' as Path
    })

    if (appModule === null) {
      return tree
    }

    let options = { metadata: 'imports', type: 'module', module: appModule } as unknown as ModuleImportOptions
    if (recipe === RecipeEnum.Prisma) {
      options = {
        ...options,
        name: 'prisma',
        path: 'src/prisma' as Path
      }
    } else {
      options = {
        ...options,
        name: 'auth',
        externalPackage: true,
        nameExternalPackage: '@ifit/nestjs-auth-decorators'
      }
    }

    const content = tree.read(options.module)?.toString() ?? ''
    const declarator: ModuleDeclarator = new ModuleDeclarator()
    tree.overwrite(
      options.module,
      declarator.declare(content, options)
    )
    return tree
  }
}
