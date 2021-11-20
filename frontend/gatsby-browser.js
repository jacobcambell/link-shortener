import React from 'react'
import { ApolloWrapper } from './src/components/ApolloWrapper';
import './src/styles/global.scss';

export const wrapRootElement = ({ element }) => {
    return (
        <ApolloWrapper>
            {element}
        </ApolloWrapper>
    )
}