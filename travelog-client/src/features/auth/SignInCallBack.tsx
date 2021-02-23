import { useEffect } from "react";
import { signInUserAsync } from "./authSlice";
import { useAppDispatch } from "../../app/customHooks";
import { history } from "../../index";

export const SignInCallBack = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(signInUserAsync()).then(() => {
      history.push("/travelplans");
    });
  }, [dispatch]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};
