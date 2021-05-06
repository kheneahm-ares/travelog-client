import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
  Icon,
  Menu,
  Image,
} from "semantic-ui-react";
import { AuthService } from "../../app/auth/AuthServices";
import { useAppDispatch } from "../../app/customHooks";
import { signOutRedirectAsync, signOutUser } from "../auth/authSlice";

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const user = AuthService.getAppUser();
  const doesAppHaveToken = AuthService.hasToken();

  function handleSignOut() {
    //signoutredirect handles redirecting to our logout page
    //signoutuser handles setting user state
    dispatch(signOutRedirectAsync()).then(() => {
      dispatch(signOutUser());
    });
  }
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header exact as={NavLink} to="/">
          <Icon size="large" name="travel" />
          Travelog
        </Menu.Item>
        {user && doesAppHaveToken && (
          <Fragment>
            <Menu.Item name="Dashboard" as={NavLink} to="/travelplans" />

            <Menu.Item>
              <Button
                as={NavLink}
                to="/create/travelplan"
                positive
                content="Create Travel Plan"
              />
            </Menu.Item>
            <Menu.Item position="right">
              <Image avatar spaced="right" src={"/Assets/Images/user.png"} />
              <Dropdown pointing="top left" text={user.userName}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/profile/invitations`}
                    text="Invitations"
                    icon="envelope open outline"
                  />
                  <Dropdown.Item
                    onClick={handleSignOut}
                    text="Logout"
                    icon="power"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Fragment>
        )}
      </Container>
    </Menu>
  );
};
