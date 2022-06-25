import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { Link, NavLink } from "react-router-dom";
import { postForm } from '../../api/users'

import styles from './Login.module.css'
import SignUp from './signup';

const Login = ({ setLoggedIn, setUser }) => {
    const description = 'We aim to help you study smart'
    const additional = 'We provide a pomodoro timer, planner, leaderboard features, personalised statistics and more..'
    const signedIn = localStorage.getItem("user") != null
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [goSignUp, setGoSignUp] = useState(false)
    const [submit, setSubmit] = useState(false)

    const [errorTxt, setErrorTxt] = useState("Failed to log in")

    const postLogin = async () => {
        const fetchedData = await postForm(email, password, setError)
        try {
            setUser(fetchedData.refresh_token)
            localStorage.setItem("user", fetchedData.refresh_token)
            localStorage.setItem("_id", fetchedData.user_id)
            localStorage.setItem("name", fetchedData.first_name + " " + fetchedData.last_name)
            localStorage.setItem("first_name", fetchedData.first_name)
            localStorage.setItem("last_name", fetchedData.last_name)
            localStorage.setItem("email", fetchedData.email)
            localStorage.setItem("points", fetchedData.points)
            // localStorage.setItem("timetable", fetchedData.timetable)
            // console.log(fetchedData)
        } catch {
            console.log("Wrong credentials")
            setError(true)
            setErrorTxt("Failed to Log In")
        }
    }

    const handleLogin = (event) => {
        event.preventDefault()
        setError(false)
        setLoading(true)
        setSubmit(true)
        postLogin()
        // localStorage.setItem('user', JSON.stringify(result)) 
        // return result
    }

    const handleEmailChange = ({ target: { name, value } }) => {
        setEmail(value)
    }

    const handlePasswordChange = ({ target: { name, value } }) => {
        setPassword(value)
    }

    const inputStyle = {

        borderTop: '0px', borderLeft: '0px', borderRight: '0px', borderBottom: '1.2px solid #042235',
        borderRadius: '0px', padding: '0px 1px 0px 1px', fontSize: '22px', fontWeight: '600', color: '#042235',
        width: '75%', marginBottom: '5vh', outline: 'none', display: 'block', marginLeft: 'auto', marginRight: 'auto',
    }

    return (
        <>
            <div className={styles.cardWrapper} style={{ backgroundColor: 'white', height: '100%', marginLeft: '160px' }}>
                <div className={styles.cardColumn} style={{ height: '100vh', backgroundColor: '#042235' }}>
                    <h1 className={styles.h1} style={{ paddingTop: '35vh', marginBottom: '2vh', marginLeft: '8vh' }}>SPLAT!</h1>
                    <h2 className={styles.h2} style={{ marginTop: '10vh', marginLeft: '8vh' }}>Studying efficiently has never been easier</h2>
                    <h2 className={styles.h2} style={{ marginTop: '3vh', marginLeft: '8vh', lineHeight: '30px' }}>We provide a pomodoro timer, planner, 
                    <br/>leaderboard features, personalised statistics
                    <br/> and more..</h2>
                </div>
                {<div className={styles.cardColumn} style={{ height: '100vh', paddingTop: '23vh' }}>
                    {!goSignUp && <Form onSubmit={handleLogin} id='login'>
                        <h3
                            style={{
                                fontSize: '40px', fontWeight: '700', lineHeight: '43px',
                                width: '75%', display: 'block', marginLeft: 'auto', marginRight: 'auto',
                                marginBottom: '42px'
                            }}>
                            Log in
                        </h3>
                        <FormGroup>
                            <input
                                id='email-input'
                                name='email'
                                placeholder='Email Address'
                                type='email'
                                onChange={handleEmailChange}
                                onClick={() => setErrorTxt("Log in")}
                                invalid={error}
                                style={inputStyle}
                            />
                        </FormGroup>
                        <FormGroup>
                            <input
                                id='password-input'
                                name='password'
                                placeholder='Password'
                                type='password'
                                onChange={handlePasswordChange}
                                onClick={() => setErrorTxt("Log in")}
                                invalid={error}
                                style={inputStyle}
                            />
                        </FormGroup>

                        {loading && !error ? <Button type='submit' className={styles.button}>Loading  <Spinner className='loginloadingspinner'></Spinner></Button> :
                            <Button type='submit' className={styles.button}>
                                {error ? errorTxt : "Log in"}
                            </Button>}
                        {/* <Button><NavLink to="/signup">Sign Up</NavLink></Button> */}
                        <div className={styles.signup}>
                            <p style={{ marginBottom: '0px' }} className={styles.h6}>Don't have an account ? &nbsp;
                                <a onClick={() => setGoSignUp(true)} style={{ fontSize: '18px', fontWeight: '400', textDecoration: 'none', padding: '0px', color: 'red', cursor: 'pointer' }}>
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </Form>}
                    {
                        goSignUp && <SignUp setGoSignUp={setGoSignUp}/>
                    }
                </div>}
            </div>
        </>
    )
}

export default Login