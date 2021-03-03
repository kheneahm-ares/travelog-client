import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Icon, Menu, Image} from "semantic-ui-react";
import { AuthService } from "../../app/auth/AuthServices";
import { useAppDispatch } from "../../app/customHooks";
import { RootState } from "../../app/store";
import { signOutUserAsync } from "../auth/authSlice";

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.authReducer.user);
  const doesAppHaveToken = AuthService.hasToken();
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header exact as={NavLink} to="/">
            <Icon size='large' name='travel'/>
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
            <Image
              avatar
              spaced="right"
              src={'/Assets/Images/user.png'}
            />
            <Dropdown pointing="top left" text={user.userName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => dispatch(signOutUserAsync())}
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
