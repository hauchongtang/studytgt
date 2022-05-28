import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import React, { useState } from 'react'
import { MdAccountCircle } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const NavBar = ({handleLogOut}) => {
    let navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    const signedIn = localStorage.getItem("user") != null
    let name = ""
    if (signedIn) {
        name = localStorage.getItem("name")
    }
    return (
        <div id="navbar-top">
            <Navbar color="faded" light expand="sm">
                <NavbarBrand href="/" >SPLAT!</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {signedIn && <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/leaderboard">
                                Leaderboard
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/planner">
                                Planner (W.I.P)
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/timer">
                                Timer
                            </NavLink>
                        </NavItem>
                    </Nav>}
                    {signedIn && <MdAccountCircle size="21"/>}
                    {signedIn && <NavLink id="profile" href="/profile">{name !== null ? name : "User"}</NavLink>}
                    {signedIn && <button id="logout" onClick={() => {
                        navigate("/")
                        handleLogOut()
                        localStorage.clear()
                        window.location.reload()
                    }}>Log Out</button>}
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar