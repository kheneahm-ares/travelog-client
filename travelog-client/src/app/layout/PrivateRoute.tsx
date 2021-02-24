import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { getUser } from "../../features/auth/authSlice";
import { AuthService } from "../auth/AuthServices";
import { useAppDispatch } from "../customHooks";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

//rest comes from routeprops which is injected by route component
export const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}) => {
    const user = useSelector(getUser);
    const doesAppHaveToken = AuthService.hasToken();

  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (user && doesAppHaveToken) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
};
