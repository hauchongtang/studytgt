import NavBar from './components/nav/navbar'
import './App.css'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import Home from './components/homepage'
import Login from './components/auth/login'
import SignUp from './components/auth/signup'
import { createBrowserHistory } from 'history'
import { authLoginSession } from './api/users'

let history = createBrowserHistory()
const App = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const [signedUp, setSignedUp] = useState(false)
  const [user, setUser] = useState()
  const [authResult, setAuthResult] = useState(null)

  const handleLogOut = () => {
    setUser({})
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")

    const authSession = async () => {
      const result = await authLoginSession(loggedInUser)
      setAuthResult(result)
      console.log(result)
    }

    if (loggedInUser !== null && authResult !== "") {
      authSession()
      setUser(loggedInUser)
    }
  },[])

  return (
    <>
      <NavBar handleLogOut={handleLogOut} setLoggedOut={setLoggedOut}/>
      <HistoryRouter history={history}>      
        <Routes>
          <Route path='/' element={user && !loggedOut ? <Home /> : <Login setUser={setUser}/>} />
          <Route path='/signup' element={<SignUp setSignednUp={setSignedUp}/>} />
          <Route path='/leaderboard' element={<>leaderboard</>} />
          <Route path='/calendar' element={<>calendar</>} />
          <Route path='/planner' element={<></>} />
        </Routes>
      </HistoryRouter>
    </>
  )
}

export default App;
