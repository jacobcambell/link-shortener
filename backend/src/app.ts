import { ApolloServer } from 'apollo-server'
import { resolvers } from './schema/resolvers'
import { typeDefs } from './schema/type-defs'
import { pg } from './knex'

require('dotenv').config()

const server = new ApolloServer({
    typeDefs, resolvers, context: ({ req }) => {
        if (req.headers.authorization) {
            if (req.headers.authorization.startsWith('Bearer ') && req.headers.authorization.split(' ').length === 2) {
                // Save JWT to context for use in resolvers - note that it could be an invalid JWT, it's just what the user is claiming for this request
                return { jwt: req.headers.authorization.split(' ')[1] }
            }
        }
    }
})

server.listen({ port: process.env.GRAPHQL_SERVER_PORT }).then(({ port }) => {
    console.log('GraphQL server listening on port ' + port)
})

// Express
import Express, { Request, Response } from 'express'
const app = Express()

app.get('/:shortlink', async (req: Request, res: Response) => {
    const shortlink = req.params.shortlink;

    await pg('links').where({ shortlink: shortlink }).select('destination').then((data) => {
        if (data.length === 0) {
            // No links found with the provided shortcode
            res.sendStatus(400)
            return;
        }

        const destination = data[0].destination;

        res.redirect(destination)
        return;
    })
})

app.listen(process.env.EXPRESS_SERVER_PORT, () => {
    console.log('Express server listening on port ' + process.env.EXPRESS_SERVER_PORT)
})