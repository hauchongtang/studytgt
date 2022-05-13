import NavBar from './components/nav/navbar'
import './App.css'
import React from 'react'
import { Router, Route, Routes } from 'react-router-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import Home from './components/homepage'
import { createBrowserHistory } from 'history'

let history = createBrowserHistory()
const App = () => {
  return (
    <>
      <NavBar />
      <HistoryRouter history={history}>      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/leaderboard' element={<>leaderboard</>} />
          <Route path='/calendar' element={<>calendar</>} />
          <Route path='/planner' element={<>planner</>} />
        </Routes>
      </HistoryRouter>
    </>
  )
}

export default App;
