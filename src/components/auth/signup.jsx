import React, { useEffect, useState } from 'react'
import { postSignUp } from '../../api/users'
import { Form, FormGroup, Input, Label, Button, Spinner, Toast, ToastHeader, ToastBody, FormFeedback, Alert } from 'reactstrap'
import { useNavigate, useLocation, Link } from 'react-router-dom'

import styles from './Login.module.css'
import validateEmail from '../hooks/validateEmail'

// TODO: Pass the state down from login to signup
const SignUp = ({ setGoSignUp }) => {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [toast, setToast] = useState(false)
    const [success, setSuccess] = useState(false)
    const [signupresponse, setSignUpResponse] = useState(null)

    let navigate = useNavigate()

    const handleFirstNameChange = ({ target: { name, value } }) => {
        setFirstName(value)
    }

    const handleLastNameChange = ({ target: { name, value } }) => {
        setLastName(value)
    }

    const handleEmailChange = ({ target: { name, value } }) => {
        setEmail(value)
    }

    const handlePasswordChange = ({ target: { name, value } }) => {
        setPassword(value)
    }

    const signUpRequest = async () => {
        const result = await postSignUp(firstname, lastname, email, password, setError)
        setSignUpResponse(result)
        setError(false)
        console.log(result)
        if (!error && result !== null) {
            console.log("go back to sign in")
            setSuccess(true)
            setTimeout(() => {
                setGoSignUp(false)
            }, 1100) 
        }
        else {
            setGoSignUp(true)
            setToast(true)
        }

    }

    const handleSignUp = (event) => {
        event.preventDefault()
        setLoading(true)
        signUpRequest()
    }

    const inputStyle = {

        borderTop: '0px', borderLeft: '0px', borderRight: '0px', borderBottom: '1.2px solid #042235',
        borderRadius: '0px', padding: '0px 1px 0px 1px', fontSize: '22px', fontWeight: '600', color: '#042235',
        width: '75%', marginBottom: '5vh', outline: 'none', display: 'block', marginLeft: 'auto', marginRight: 'auto',
    }

    return (
        <div className={styles.cardColumn} style={{ marginTop: '-16vh' }}>
            <Form onSubmit={handleSignUp} id='signup'>
                <h3
                    style={{
                        fontSize: '40px', fontWeight: '700', lineHeight: '43px',
                        width: '75%', display: 'block', marginLeft: 'auto', marginRight: 'auto',
                        marginBottom: '42px'
                    }}>
                    Create Account
                </h3>
                <Alert style={{ width: '75%', display: 'block', marginLeft: 'auto', marginRight: 'auto', }} color={'danger'} isOpen={toast}>
                    Failed to sign up, try again
                </Alert>
                <Alert style={{ width: '75%', display: 'block', marginLeft: 'auto', marginRight: 'auto', }} color={'success'} isOpen={success}>
                    Success
                </Alert>
                <FormGroup>
                    <Input
                        id='firstname-input-signup'
                        name='firstname'
                        placeholder='First Name'
                        type='text'
                        onChange={handleFirstNameChange}
                        valid={firstname.length > 0}
                        invalid={firstname.length <= 0}
                        style={inputStyle}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        id='lastname-input-signup'
                        name='lastname'
                        placeholder='Last Name'
                        type='text'
                        onChange={handleLastNameChange}
                        valid={lastname.length > 0}
                        invalid={lastname.length <= 0}
                        style={inputStyle}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        id='email-input-signup'
                        name='email'
                        placeholder='Email address'
                        type='text'
                        onChange={handleEmailChange}
                        value={email}
                        invalid={!validateEmail(email)}
                        valid={validateEmail(email)}
                        style={inputStyle}
                    />
                </FormGroup>
                <FormGroup id='signup'>
                    <Input
                        id='password-input-signup'
                        name='password'
                        placeholder={'Password'}
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                        valid={password.length >= 6}
                        invalid={password.length < 6}
                        style={inputStyle}
                    />
                </FormGroup>
                {loading && !error && !toast ? <Button type='submit' className={styles.button}>Loading  <Spinner className='loginloadingspinner'></Spinner></Button> :
                    <Button type='submit' className={styles.button} onMouseOver={() => {
                        if (error) setErrMsg("Submit")
                    }}>
                        {error ? errMsg : "Submit"}
                    </Button>}
                <div className={styles.signup}>
                    <p style={{ marginBottom: '0px' }} className={styles.h6}>Have an account ? &nbsp;
                        <a onClick={() => setGoSignUp(false)} style={{ fontSize: '18px', fontWeight: '400', textDecoration: 'none', padding: '0px', color: 'red', cursor: 'pointer' }}>
                            Login
                        </a>
                    </p>
                </div>
            </Form>
        </div>
    )
}

export default SignUp