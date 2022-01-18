import { Path } from '@angular-devkit/core'
import { capitalize, classify } from '@angular-devkit/core/src/utils/strings'
import { ModuleImportDeclarator } from './module-import.declarator'
import { ModuleMetadataDeclarator } from './module-metadata.declarator'

export interface DeclarationOptions {
  metadata: string
  type?: string
  name: string
  className?: string
  path: Path
  module: Path
  symbol?: string
  staticOptions?: {
    name: string
    value: Record<string, any>
  }
}

export class ModuleDeclarator {
  constructor (
    private readonly imports: ModuleImportDeclarator = new ModuleImportDeclarator(),
    private readonly metadata: ModuleMetadataDeclarator = new ModuleMetadataDeclarator()
  ) {}

  public declare (content: string, options: DeclarationOptions): string {
    options = this.computeSymbol(options)
    content = this.imports.declare(content, options)
    content = this.metadata.declare(content, options)
    return content
  }

  private computeSymbol (options: DeclarationOptions): DeclarationOptions {
    const target = Object.assign({}, options)
    if (options.className !== undefined) {
      target.symbol = options.className
    } else if (options.type !== undefined) {
      target.symbol = classify(options.name).concat(capitalize(options.type))
    } else {
      target.symbol = classify(options.name)
    }
    return target
  }
}
