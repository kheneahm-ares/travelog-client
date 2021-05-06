import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { AuthService } from "../auth/AuthServices";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

//rest comes from routeprops which is injected by route component
export const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}) => {
  const user = AuthService.getAppUser();

  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (user) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
};
