import { ApolloServer } from 'apollo-server'
import { resolvers } from './schema/resolvers'
import { typeDefs } from './schema/type-defs'
require('dotenv').config()

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: process.env.GRAPHQL_SERVER_PORT }).then(({ port }) => {
    console.log('GraphQL server listening on port ' + port)
})

// Express
import Express from 'express'
const app = Express()

app.listen(process.env.EXPRESS_SERVER_PORT, () => {
    console.log('Express server listening on port ' + process.env.EXPRESS_SERVER_PORT)
})