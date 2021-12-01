import { gql } from "apollo-server"

export const typeDefs = gql`
    type Query {
        globalAnalytics: [DateAnalytics!]!
        allLinks: [Link!]
    }

    type Mutation {
        createShortLink(destination: String!): createShortLinkResults!
        registerAccount(email: String!, password: String!): registerAccountResults!
        login(email: String!, password: String!): loginResults!
        deleteLink(id: Int!): String
    }

    type Error {
        errorMessage: String!
    }

    type Link {
        id: ID!
        owner_id: ID
        destination: String!
        shortlink: String!
        created: String!
        name: String
        analytics: LinkAnalytics
    }

    type JWT {
        token: String!
    }

    type DateAnalytics {
        date: String!
        numClicks: Int!
    }

    type LinkAnalytics {
        totalClicks: Int!
    }

    union createShortLinkResults = Link | Error
    union registerAccountResults = JWT | Error
    union loginResults = JWT | Error
`