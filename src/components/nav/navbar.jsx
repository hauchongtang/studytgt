import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    return (
        <div id="navbar-top">
            <Navbar color="faded" light expand="sm">
                <NavbarBrand href="/" >studytgt</NavbarBrand>
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
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar