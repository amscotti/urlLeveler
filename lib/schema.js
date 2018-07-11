const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

module.exports = shortener => {
  const URLType = new GraphQLObjectType({
    name: 'URL',

    fields: () => ({
      key: { type: GraphQLString },
      url: { type: GraphQLString }
    })
  })

  const QueryType = new GraphQLObjectType({
    name: 'Query',

    fields: () => ({
      url: {
        type: URLType,
        args: {
          key: { type: GraphQLString }
        },
        resolve: (_, args) => shortener.getURL(args.key)
      }
    })
  })

  const MutationType = new GraphQLObjectType({
    name: 'Mutation',

    fields: () => ({
      addURL: {
        type: URLType,
        args: {
          url: { type: GraphQLString }
        },
        resolve: (_, args) => shortener.addURL(args.url)
      },
      delURL: {
        type: URLType,
        args: {
          key: { type: GraphQLString }
        },
        resolve: (_, args) => shortener.delURL(args.key)
      }
    })
  })

  return new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
  })
}
