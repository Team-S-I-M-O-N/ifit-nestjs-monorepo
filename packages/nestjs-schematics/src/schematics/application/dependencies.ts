import { NodeDependency, NodeDependencyType } from '../../utils/dependencies.utils'

export const dependencies: NodeDependency[] = [
  {
    type: NodeDependencyType.Default,
    version: '^0.33.8',
    name: '@apollo/federation'
  },
  {
    type: NodeDependencyType.Default,
    version: '^0.1.5',
    name: '@apollo/subgraph'
  },
  {
    type: NodeDependencyType.Default,
    version: '^3.5.0',
    name: 'apollo-server-express'
  },
  {
    type: NodeDependencyType.Default,
    version: '^8.6.0',
    name: '@graphql-tools/utils'
  },
  { type: NodeDependencyType.Default, version: '^15', name: 'graphql' },
  {
    type: NodeDependencyType.Default,
    version: '^3.7.0',
    name: 'graphql-request'
  },
  {
    type: NodeDependencyType.Default,
    version: '^9.1.2',
    name: '@nestjs/graphql'
  },
  {
    type: NodeDependencyType.Dev,
    version: '^14.6.1',
    name: 'prisma-nestjs-graphql'
  }
]
