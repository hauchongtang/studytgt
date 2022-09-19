import NavBar from './components/nav/navbar'
import './App.css'
import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import SignUp from './components/auth/signup'
import { authLoginSession } from './api/users'
import Planner from './components/planner/planner'
import Timer from './components/pomodoro/timer'
import Dashboard from './components/Dashboard'
import SideNav from './components/nav/navbarv2'
import Login from './components/auth/login'
import { parseUrl } from './data/parseImports'
import ProfilePage from './components/Profile/profilepage'
import About from './components/About/AboutPage'
import UserProfile from './components/Profile/UserProfile'


const App = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const [signedUp, setSignedUp] = useState(false)
  const [user, setUser] = useState()
  const [authResult, setAuthResult] = useState(null)
  // let location = useLocation()
  const handleLogOut = (pathName) => {
    setUser({})
    // localStorage.clear()
    window.location.replace('/')
  }
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    const timetableUrl = localStorage.getItem("timetable")

    const authSession = async () => {
      const result = await authLoginSession(loggedInUser)
      setAuthResult(result)
      console.log(result)
      if (result === undefined) {
        setLoggedOut(true)
        localStorage.clear()
        window.location.replace('/')
    }
    }

    if (loggedInUser !== null && authResult !== "") {
      try {
        authSession()
        setUser(loggedInUser)
        const parseURL = async () => await parseUrl(timetableUrl)
        parseURL()
      } catch (error) {
        console.log(error, "caught")
        setLoggedOut(true)
      }
    }
  }, [])

  return (
    <>

      <BrowserRouter forceRefresh={true}>
        {user && !loggedOut && <NavBar handleLogOut={handleLogOut} setLoggedOut={setLoggedOut} />}
        <SideNav loggedIn={user && !loggedOut}/>
        <Routes>
          <Route path='/' element={user && !loggedOut ? <Dashboard /> : <Login setUser={setUser} />} />
          <Route path='/signup' element={<SignUp setSignednUp={setSignedUp} />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/timer' element={<Timer />} />
          <Route path='/planner' element={<Planner />} />
          <Route path='/about' element={<About />} />
          <Route path='/:id' element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
