import { useEffect } from "react";
import { signInSilentAsync } from "./authSlice";
import { useAppDispatch } from "../../app/customHooks";

//this is shown in a hidden iframe
export const SignInSilentCallback = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(signInSilentAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};
