import React from 'react'
import { Disclosure } from '@headlessui/react' 
import { GiHamburgerMenu } from "react-icons/gi"
import { MdOutlineSpaceDashboard, MdEditCalendar, MdOutlineLogout, MdOutlineHelpOutline, MdOutlineSettings } from "react-icons/md"
import { BsGithub } from "react-icons/bs"
import { FaUserFriends } from "react-icons/fa"

import styles from "../../styles/SideNavbar.styles"
import NavLink from './NavLink'

const navLinkStyles = "text-2xl text-gray-600 group-hover:text-white";
const githubRepo = "https://github.com/hauchongtang/studytgt"

const menuItems = [
  {
    text: 'Dashboard',
    link: '/dashboard',
    icon: <MdOutlineSpaceDashboard className={navLinkStyles} />
  },
  {
    text: 'Timetable',
    link: '/timetable',
    icon: <MdEditCalendar className={navLinkStyles} />
  },
  {
    text: 'Find Friends',
    link: 'explore',
    icon: <FaUserFriends className={navLinkStyles} />
  }
]

const micItems = [
  {
    text: 'Settings',
    link: '/settings',
    icon: <MdOutlineSettings className={navLinkStyles} />
  },
  {
    text: 'Guide',
    link: '/guide',
    icon: <MdOutlineHelpOutline className={navLinkStyles} />
  },
  {
    text: 'Contribute',
    link: githubRepo,
    icon: <BsGithub className={navLinkStyles} />
  },
  {
    text: 'Logout',
    link: '/',
    icon: <MdOutlineLogout className={navLinkStyles} />
  }
]

function SideNavbar() {
  return (
    <>
      <Disclosure as="nav">
        <Disclosure.Button className={styles.hamburgerButton}>
          <GiHamburgerMenu className="block md:hidden h-6 w-6" aria-hidden="true" />
        </Disclosure.Button>
        <div className={styles.container}>
          <h1 className="text-xl text-center cursor-pointer font-bold text-red-400 border-b border-gray-100 pb-4 w-full">
            splat
          </h1>
          <div className="my-4 border-b border-gray-100 pb-4">
            {menuItems.map((item, idx) => {
              return (
                <NavLink key={idx} text={item.text} icon={item.icon} link={item.link} />
              )
            })}
          </div>
          <div className="absolute my-4 inset-x-4 bottom-0">
            {micItems.map((item, idx) => {
              return (
                <NavLink key={idx} text={item.text} icon={item.icon} link={item.link} />
              )
            })}
          </div>
        </div>
      </Disclosure>
    </>
  )
}

export default SideNavbar