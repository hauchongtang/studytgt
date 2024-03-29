import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GrGithub } from 'react-icons/gr';

import styles from './Nav.module.css'
import splatlogo from '../../assets/splat-pic.png'

const SideNav = ({ loggedIn }) => {
    const location = useLocation()
    var currentRoute = location.pathname
    return (
        <>
            <div className={styles.sidenav}>
                {<Link className={styles.navlink} to='/'><img className={styles.img} src={splatlogo}></img></Link>}
                {loggedIn && <Link style={{ marginTop: '20px' }} className={currentRoute === '/' ? styles.selected : ''} id='navelems' to="/">Dashboard</Link>}
                {loggedIn && <Link className={currentRoute === '/planner' ? styles.selected : ''} id='navelems' to="/planner">Schedule</Link>}
                {/* {loggedIn && <Link className={currentRoute === '/timer' ? styles.selected : ''} id='navelems' to="/timer">Add Task</Link>} */}
                {loggedIn && <Link className={currentRoute === '/profile' ? styles.selected : ''} id='navelems' to="/profile">Profile</Link>}
                {loggedIn && <Link className={currentRoute === '/about' ? styles.selected : ''} id='navelems' to="/about">About</Link>}
                <a className={''} href='https://github.com/hauchongtang/studytgt' id='navelems' 
                    style={{ textAlign: 'center', marginRight: '16px', marginTop: loggedIn ? '43.8vh' : '77vh'}}>
                    <GrGithub size={'6vh'} alignmentBaseline='middle'/>
                </a>
            </div>
        </>
    )
}

export default SideNav