import NavBar from './components/nav/navbar'
import './App.css'
import React, { useEffect, useReducer, useState } from 'react'
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import SignUp from './components/auth/signup'
import Profile from './components/profilepage'
import { createBrowserHistory } from 'history'
import { authLoginSession } from './api/users'
import Planner from './components/planner/planner'
import Timer from './components/pomodoro/timer'
import Dashboard from './components/Dashboard'
import SideNav from './components/nav/navbarv2'
import Login from './components/auth/login'
import { parseUrl } from './data/parseImports'


const App = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const [signedUp, setSignedUp] = useState(false)
  const [user, setUser] = useState()
  const [authResult, setAuthResult] = useState(null)
  // let location = useLocation()
  const handleLogOut = (pathName) => {
    setUser({})
    // localStorage.clear()
    // window.location.reload()
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    const timetableUrl = localStorage.getItem("timetable")

    const authSession = async () => {
      const result = await authLoginSession(loggedInUser)
      setAuthResult(result)
    }

    if (loggedInUser !== null && authResult !== "") {
      authSession()
      setUser(loggedInUser)
      parseUrl(timetableUrl)
    }
  }, [])

  return (
    <>

      <BrowserRouter forceRefresh={false}>
        {user && !loggedOut && <NavBar handleLogOut={handleLogOut} setLoggedOut={setLoggedOut} />}
        <SideNav loggedIn={user && !loggedOut}/>
        <Routes>
          <Route path='/' element={user && !loggedOut ? <Dashboard /> : <Login setUser={setUser} />} />
          <Route path='/signup' element={<SignUp setSignednUp={setSignedUp} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/timer' element={<Timer />} />
          <Route path='/planner' element={<Planner />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
