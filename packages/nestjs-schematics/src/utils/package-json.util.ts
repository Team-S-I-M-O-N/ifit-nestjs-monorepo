import { SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics'

export function getPackageJsonContent (tree: Tree, context: SchematicContext): Record<string, unknown> {
  const path = 'package.json'

  const packageJsonFileEntry = tree.get(path)
  if (packageJsonFileEntry === null) {
    throw new SchematicsException(`The package.json doesn't exist on this path ${path}`)
  }

  const { content } = packageJsonFileEntry

  let packageJson
  try {
    packageJson = JSON.parse(content.toString())
  } catch (e) {
    context.logger.debug(e)
    throw new SchematicsException(`Failed to parse ${path}`)
  }

  return packageJson
}
