import React from "react";
import { QueryParamProvider } from "use-query-params";
import { Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/authContext";

export const Contexts: React.FC = ({ children }) => {
  return (
    <QueryParamProvider ReactRouterRoute={Route}>
      <ChakraProvider>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </QueryParamProvider>
  );
};
