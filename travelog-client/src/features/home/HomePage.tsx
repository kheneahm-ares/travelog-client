import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthService } from "../../app/auth/AuthServices";
import { RootState } from "../../app/store";
import React, { Fragment } from "react";

export const HomePage = () => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const doesAppHaveToken = AuthService.hasToken();

  return (
    <Fragment>
      {user != null && doesAppHaveToken ? (
        <Fragment>
          <Link to="/travelplans">Dashboard</Link>
        </Fragment>
      ) : (
        <button onClick={() => AuthService.signInRedirect()}>Sign In</button>
      )}
    </Fragment>
  );
};
