import React from 'react'
import { NavLink } from 'react-router-dom'
import splat_pic from '../assets/splat-pic.png'

const Home = () => {
    const description = 'We aim to help you study smart'
    const additional = 'We provide a pomodoro timer, planner, leaderboard features, personalised statistics and more..'
    return (
        <>
            <section id="header" className="d-flex align-items-center">
            <div className="container-fluid nav_bg">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                  <h1>
                    {"This is "}
                    <strong className="brand-name"> SPLAT! </strong>
                  </h1>

                  <h2 className="my-3">
                    {description}
                    <br/>
                  </h2>

                  <h2>
                    <br/>
                    {additional}
                  </h2>

                  <div className="mt-3">
                    <NavLink to={"/planner"} className="btn-get-started">
                      {"Get Started"}
                    </NavLink>
                  </div>
                </div>

                <div className="col-lg-6 order-1 order-lg-2 header-img">
                  <img
                    src={splat_pic}
                    className="img-fluid animated"
                    alt="landingpage"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
            </section>
        </>
    )
}

export default Home