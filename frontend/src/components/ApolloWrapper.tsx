import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

export const ApolloWrapper = ({ children }) => {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000'
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}
