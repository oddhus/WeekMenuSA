import React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
    component: React.ComponentType<RouteComponentProps<any>>
    path: string
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    const { token } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!token) {
                    return <Component {...rest} {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;