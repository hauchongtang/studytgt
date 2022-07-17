import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import React, { useState } from 'react'
import { GrLogout } from 'react-icons/gr';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

import styles from './Nav.module.css'

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
        <div className={styles.navbartop}>
            <a className={styles.logo} href='/'>SPLAT!</a>
            <div className={styles.user}>
                {signedIn && <h6 className={styles.h6}>{name !== "" ? `Hello, ${name}` : 'Hello, User'}</h6>}
                {signedIn && <button className={styles.logout} onClick={() => {
                        // navigate("/")
                        handleLogOut()
                        var timetable = localStorage.getItem("timetable")
                        localStorage.clear()
                        localStorage.setItem("timetable", timetable)
                        window.location.reload()
                    }}>Log Out<GrLogout size={20} style={{ marginTop: 'auto', marginBottom: '4px', marginLeft: '12px' }}/></button>}
            </div>
            
            
        </div>
    )
}

export default NavBar