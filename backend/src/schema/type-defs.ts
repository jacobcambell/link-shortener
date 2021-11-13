import { gql } from "apollo-server"

export const typeDefs = gql`
    type Query {
        none: String!
    }

    type Mutation {
        createShortLink(destination: String!): createShortLinkResults!
    }

    type Error {
        errorMessage: String!
    }

    type Link {
        id: ID!
        owner_id: ID
        destination: String!
        shortlink: String!
    }

    union createShortLinkResults = Link | Error
`