import { gql } from "apollo-server"

export const typeDefs = gql`
    type Query {
        none: String!
    }

    type Mutation {
        none: String!
    }
`