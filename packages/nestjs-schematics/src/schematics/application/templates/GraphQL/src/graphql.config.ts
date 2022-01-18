import { GqlModuleOptions, GqlOptionsFactory, GraphQLFederationModule } from '@nestjs/graphql'

class GraphQLConfig implements GqlOptionsFactory {
  createGqlOptions (): GqlModuleOptions {
    return {
      autoSchemaFile: true
    }
  }
}

export const GraphQLSubGraphConfig = GraphQLFederationModule.forRootAsync({
  useClass: GraphQLConfig
})
