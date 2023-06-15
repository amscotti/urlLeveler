import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

export const schemaModule = (shortener) => {
  const URLType = new GraphQLObjectType({
    name: 'URL',
    description: 'A URL object with a key and a URL',
    fields: () => ({
      key: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The key of the URL'
      },
      url: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The actual URL'
      }
    })
  })

  const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root query type',
    fields: () => ({
      url: {
        type: URLType,
        args: {
          key: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async (_, args) => await shortener.getURL(args.key)
      }
    })
  })

  const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root mutation type',
    fields: () => ({
      addURL: {
        type: URLType,
        args: {
          url: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async (_, args) => await shortener.addURL(args.url)
      },
      delURL: {
        type: URLType,
        args: {
          key: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async (_, args) => await shortener.delURL(args.key)
      }
    })
  })

  return new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
  })
}
