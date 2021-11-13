import { ApolloServer } from 'apollo-server'
import { resolvers } from './schema/resolvers'
import { typeDefs } from './schema/type-defs'
import { client } from './queries';

require('dotenv').config()

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: process.env.GRAPHQL_SERVER_PORT }).then(({ port }) => {
    console.log('GraphQL server listening on port ' + port)
})

// Express
import Express from 'express'
const app = Express()

app.get('/:shortlink', (req: Express.Request, res: Express.Response) => {
    const shortlink = req.params.shortlink;

    // Get the destination from this shortlink
    client.query('SELECT destination FROM links WHERE shortlink=$1', [shortlink]).then((results) => {
        if (results.rows.length === 0) {
            // No links found with the provided shortcode
            res.sendStatus(400)
            return;
        }

        const destination = results.rows[0].destination;

        res.redirect(destination)
        return;
    })
})

app.listen(process.env.EXPRESS_SERVER_PORT, () => {
    console.log('Express server listening on port ' + process.env.EXPRESS_SERVER_PORT)
})