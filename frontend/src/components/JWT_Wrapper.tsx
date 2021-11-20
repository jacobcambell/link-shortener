import React, { createContext, useState } from 'react'

export const jwt_context = createContext(null);

export default function JWT_Wrapper({ children }) {

    // The user's JWT they received after login or signup
    const [jwt, setJWT] = useState('')

    return (
        <jwt_context.Provider value={{ jwt, setJWT }}>
            {children}
        </jwt_context.Provider>
    )
}
