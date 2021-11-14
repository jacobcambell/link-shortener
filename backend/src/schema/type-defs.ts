import { gql } from "apollo-server"

export const typeDefs = gql`
    type Query {
        none: String!
    }

    type Mutation {
        createShortLink(destination: String!): createShortLinkResults!
        registerAccount(email: String!, password: String!): registerAccountResults!
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

    type JWT {
        token: String!
    }

    union createShortLinkResults = Link | Error
    union registerAccountResults = JWT | Error
`