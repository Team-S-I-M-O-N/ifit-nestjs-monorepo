import { normalize, Path } from '@angular-devkit/core'
import { DeclarationOptions } from './module.declarator'
import { PathSolver } from './path.solver'

export type ModuleImportOptions = DeclarationOptions & { externalPackage?: boolean, nameExternalPackage?: string}

export class ModuleImportDeclarator {
  constructor (private readonly solver: PathSolver = new PathSolver()) {}

  public declare (content: string, options: ModuleImportOptions): string {
    const toInsert = this.buildLineToInsert(options)
    const contentLines = content.split('\n')
    const finalImportIndex = this.findImportsEndpoint(contentLines)
    contentLines.splice(finalImportIndex + 1, 0, toInsert)
    return contentLines.join('\n')
  }

  private findImportsEndpoint (contentLines: string[]): number {
    const reversedContent = Array.from(contentLines).reverse()
    const reverseImports = reversedContent.filter(line =>
      line.match(/\} from ('|")/)
    )
    if (reverseImports.length <= 0) {
      return 0
    }
    return contentLines.indexOf(reverseImports[0])
  }

  private buildLineToInsert (options: ModuleImportOptions): string {
    if (options.externalPackage === true) {
      return `import { ${options.symbol ?? ''} } from '${options.nameExternalPackage}'`
    }

    return `import { ${options.symbol ?? ''} } from '${this.computeRelativePath(
      options
    )}'`
  }

  private computeRelativePath (options: DeclarationOptions): string {
    let importModulePath: Path
    if (options.type !== undefined) {
      importModulePath = normalize(
        `/${options.path}/${options.name}.${options.type}`
      )
    } else {
      importModulePath = normalize(`/${options.path}/${options.name}`)
    }
    const solverRelative = this.solver.relative(options.module, importModulePath)
    return solverRelative
  }
}
