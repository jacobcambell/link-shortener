import React from 'react'
import { ApolloWrapper } from './src/components/ApolloWrapper';
import JWT_Wrapper from './src/components/JWT_Wrapper';
import './src/styles/global.scss';

export const wrapRootElement = ({ element }) => {
    return (
        <JWT_Wrapper>
            <ApolloWrapper>
                {element}
            </ApolloWrapper>
        </JWT_Wrapper>
    )
}