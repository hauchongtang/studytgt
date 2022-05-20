import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({handleLogOut}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    const signedIn = localStorage.getItem("user") != null
    return (
        <div id="navbar-top">
            <Navbar color="faded" light expand="sm">
                <NavbarBrand href="/" >SPLAT!</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/leaderboard">
                                Leaderboard
                            </NavLink>
                        </NavItem>                        <NavItem>
                            <NavLink href="/calendar">
                                Calendar
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/planner">
                                Planner
                            </NavLink>
                        </NavItem>
                    </Nav>
                    {signedIn && <button id="logout" onClick={handleLogOut}>Log Out</button>}
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar