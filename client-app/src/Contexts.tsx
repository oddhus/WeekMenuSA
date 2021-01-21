import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import { Route } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"

export const Contexts: React.FC = ({ children }) => {
    return (
        <QueryParamProvider ReactRouterRoute={Route}>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </QueryParamProvider>
    );
}