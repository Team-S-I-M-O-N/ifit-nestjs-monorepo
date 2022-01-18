import { join, Path, strings } from '@angular-devkit/core'
import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Source,
  template,
  Tree,
  url
} from '@angular-devkit/schematics'
import { basename, parse } from 'path'
import {
  DEFAULT_GIT_IGNORE,
  DEFAULT_APP_NAME,
  DEFAULT_AUTHOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_VERSION
} from '../defaults'
import { ApplicationOptions } from './application.schema'
import { NodePackageInstallTask, RepositoryInitializerTask } from '@angular-devkit/schematics/tasks'

export type BackendArchitecture = 'REST'

export function main (options: ApplicationOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    options.name = strings.dasherize(options.name ?? DEFAULT_APP_NAME)
    options.packageManager = 'yarn'

    const path = options.directory ?? options.name
    options = transform(options)

    // Install dependencies using yarn as the default package manager
    context.addTask(
      new NodePackageInstallTask({
        workingDirectory: path,
        packageManager: options.packageManager
      })
    )

    context.addTask(new RepositoryInitializerTask(path))

    return chain([
      mergeWith(generate(options, path)),
      addGitIgnore(path as Path)
    ])
  }
}

function transform (options: ApplicationOptions): ApplicationOptions {
  const target: ApplicationOptions = Object.assign({}, options)

  target.architecture = 'REST'
  target.author = target.author ?? DEFAULT_AUTHOR
  target.description = target.description ?? DEFAULT_DESCRIPTION
  target.name = resolvePackageName(target.name)
  target.version = target.version ?? DEFAULT_VERSION
  return target
}

function resolvePackageName (path: string): string {
  const { name } = parse(path)
  if (name === '.') {
    return basename(process.cwd())
  }
  return name
}

function generate (options: ApplicationOptions, path: string): Source {
  return apply(url(join('./templates' as Path, options.architecture)), [
    template({
      ...strings,
      ...options
    }),
    move(path)
  ])
}

function addGitIgnore (path: Path): Rule {
  return (tree: Tree) => {
    const gitIgnorePath = join(path, '.gitignore')
    const existingGitIgnore = tree.get(gitIgnorePath)
    if (existingGitIgnore !== null) {
      tree.overwrite(gitIgnorePath, DEFAULT_GIT_IGNORE)
      return
    }

    tree.create(gitIgnorePath, DEFAULT_GIT_IGNORE)
  }
}
