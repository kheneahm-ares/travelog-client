import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { getUser } from "../../features/auth/authSlice";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

//rest comes from routeprops which is injected by route component
export const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}) => {
    const user = useSelector(getUser);

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
