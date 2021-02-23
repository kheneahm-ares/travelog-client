import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useAppDispatch } from '../../app/customHooks'
import { signOutUserAsync } from '../auth/authSlice'

export const NavBar = () => {
    const dispatch = useAppDispatch();
    return (
        <Menu fixed="top">
            <Container>
                <Menu.Item name="Sign In" as={NavLink} to="/"/>
                <Menu.Item name="Sign Out" as={Button} onClick={() => dispatch(signOutUserAsync())}/>
                <Menu.Item name="Dashboard" as={NavLink} to="/travelplans"/>
            </Container>
            
        </Menu>
    )
}
