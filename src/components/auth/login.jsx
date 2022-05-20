import React, { useState } from 'react'
import { Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { NavLink } from "react-router-dom";
import { postForm } from '../../api/users'
import splat_pic from '../../assets/splat-pic.png'

const Login = ({ setLoggedIn }) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (event) => {
        event.preventDefault()
        setError(null)
        setLoading(true)

        const result = postForm(email, password, setLoggedIn)

        console.log(result)
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
                        />
                    </FormGroup>

                    {loading ? <button type='button' id='loadingbutton'>Loading  <Spinner className='loginloadingspinner'></Spinner></button>:
                    <button type='submit' id='loginbutton'>
                        Login
                    </button>}
                    <NavLink to="/signup" className="btn-signup">Sign Up</NavLink>
                </Form>
            </div>
    )
}

export default Login