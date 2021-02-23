import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'

export const NavBar = () => {
    return (
        <Menu fixed="top">
            <Container>
                <Menu.Item name="Sign In" as={NavLink} to="/"/>
                <Menu.Item name="Dashboard" as={NavLink} to="/travelplans"/>
            </Container>
            
        </Menu>
    )
}
