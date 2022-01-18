import { NodeDependency, NodeDependencyType } from '../../../utils/dependencies.utils'

export const prismaDependencies: NodeDependency[] = [
  {
    type: NodeDependencyType.Default,
    version: '^3.7.0',
    name: '@prisma/client'
  },
  {
    type: NodeDependencyType.Dev,
    version: '^3.7.0',
    name: 'prisma'
  }
]
