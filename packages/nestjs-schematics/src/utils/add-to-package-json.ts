import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { PackageJsonPropertyEnum } from '../types/package-json-types'
import { getPackageJsonContent } from './package-json.util'

/**
 * Add new property values to an specific package.json property
 * @param propertyToUpdate
 * @param newValues
 */
export function addPropertiesToPackageJson (propertyToUpdate: PackageJsonPropertyEnum, newPropertyValues: Record<string, string>): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = getPackageJsonContent(tree, context)

    const propertyValues = packageJson[propertyToUpdate] as Record<string, string> ?? {}
    packageJson[propertyToUpdate] = { ...propertyValues, ...newPropertyValues }

    const updatedPackageJson = JSON.stringify(packageJson, null, 2)
    tree.overwrite('package.json', updatedPackageJson)

    return tree
  }
}
