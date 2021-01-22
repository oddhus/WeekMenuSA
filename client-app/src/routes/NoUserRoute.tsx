import React, { useContext } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

interface Props {
  component: React.ComponentType<RouteComponentProps<any>>;
  path: string;
}

const NoUserRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
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

export default NoUserRoute;
