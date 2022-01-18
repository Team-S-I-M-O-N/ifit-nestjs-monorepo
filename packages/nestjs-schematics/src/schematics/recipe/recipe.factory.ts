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
  NodeDependency
} from '../../utils/dependencies.utils'
import { prismaDependencies } from './dependencies/prisma'
import { PackageManagerEnum } from '../../types/package-manager.utils'
import { PackageJsonPropertyEnum } from '../../types/package-json-types'
import { addPropertiesToPackageJson } from '../../utils/add-to-package-json'
import { getPackageJsonContent } from '../../utils/package-json.util'
import { DeclarationOptions, ModuleDeclarator, ModuleFinder } from '../../utils'

export enum RecipeEnum {
  Prisma = 'prisma',
}

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
    return branchAndMerge(
      chain([
        mergeWith(generate(options), MergeStrategy.Overwrite),
        addDeclarationToAppModule(),
        addDependencies(options.recipe),
        addCustomScripts(tree, context, options.name)
      ])
    )
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

function addDependencies (recipe: RecipeEnum): Rule {
  return (host: Tree) => {
    if (recipe === RecipeEnum.Prisma) {
      prismaDependencies.forEach((dependency: NodeDependency) => {
        addPackageJsonDependency(host, dependency)
      })
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

function addDeclarationToAppModule (): Rule {
  return (tree: Tree) => {
    const appModule = new ModuleFinder(tree).find({
      name: 'app',
      path: 'src' as Path
    })

    if (appModule === null) {
      return tree
    }

    const options: DeclarationOptions = {
      metadata: 'imports',
      type: 'module',
      name: 'prisma',
      path: 'src/prisma' as Path,
      module: appModule
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
