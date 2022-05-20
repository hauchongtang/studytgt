import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { NavLink } from "react-router-dom";
import { postForm } from '../../api/users'
import splat_pic from '../../assets/splat-pic.png'

const Login = ({ setLoggedIn, setUser }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submit, setSubmit] = useState(false)
    const [errorTxt, setErrorTxt] = useState("Failed to log in")

    const postLogin = async () => {
        const fetchedData = await postForm(email, password, setError)
        try {
            setUser(fetchedData.refresh_token)
            localStorage.setItem("user", fetchedData.refresh_token)
            console.log(fetchedData.refresh_token)
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

    return (
        <div id="login-component" className='container'>
            <Form onSubmit={handleLogin}>
                <img
                    src={splat_pic}
                    className="img-fluid animated"
                    alt="landingpage"
                />
                <FormGroup>
                    <Label for='email'>
                        Email
                    </Label>
                    <Input
                        id='email-input'
                        name='email'
                        placeholder='Enter your email address'
                        type='text'
                        onChange={handleEmailChange}
                        onClick={() => setErrorTxt("Log in")}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>
                        Password
                    </Label>
                    <Input
                        id='password-input'
                        name='password'
                        placeholder='Enter your password (min 2 characters)'
                        type='text'
                        onChange={handlePasswordChange}
                        onClick={() => setErrorTxt("Log in")}
                    />
                </FormGroup>

                {loading && !error ? <button type='button' id='loadingbutton'>Loading  <Spinner className='loginloadingspinner'></Spinner></button> :
                    <button type='submit' id='loginbutton' >
                        {error ? errorTxt : "Log in"}
                    </button>}
                <NavLink to="/signup" className="btn-signup">Sign Up</NavLink>
            </Form>
        </div>
    )
}

export default Login