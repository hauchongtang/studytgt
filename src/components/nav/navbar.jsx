import { Navbar, NavbarBrand, NavItem } from "reactstrap";

export const NavBar = () => {
    return (
        <div id="navbar-top">
            <Navbar color="faded" light>
                <NavbarBrand href="/" >studytgt</NavbarBrand>
            </Navbar>
        </div>
    )
}

export default NavBar