import NavBar from './components/nav/navbar'
import './App.css'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import Home from './components/homepage'
import Login from './components/auth/login'
import { createBrowserHistory } from 'history'

let history = createBrowserHistory()
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <NavBar />
      <HistoryRouter history={history}>      
        <Routes>
          <Route path='/' element={loggedIn ? <Home /> : <Login setLoggedIn={setLoggedIn}/>} />
          <Route path='/leaderboard' element={<>leaderboard</>} />
          <Route path='/calendar' element={<>calendar</>} />
          <Route path='/planner' element={<></>} />
        </Routes>
      </HistoryRouter>
    </>
  )
}

export default App;
