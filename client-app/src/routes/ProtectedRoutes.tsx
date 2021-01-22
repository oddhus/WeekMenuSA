import React, { useContext } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

interface Props {
  component: React.ComponentType<RouteComponentProps<any>>;
  path: string;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
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
