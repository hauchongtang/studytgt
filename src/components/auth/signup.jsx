import React, {useState} from 'react'
import { postSignUp } from '../../api/users'
import { Form, FormGroup, Input, Label, Button, Spinner, Toast, ToastHeader, ToastBody } from 'reactstrap'

// TODO: Pass the state down from login to signup
const SignUp = () => {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState("")

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

    const handleSignUp = (event) => {
        event.preventDefault()
        setLoading(true)

        postSignUp(firstname, lastname, email, password).then(response => {
            setError(false)
            console.log(response)
            return response
        }).catch(err => {
            setError(true)
            setErrMsg(err)
            console.log(err)
        })
    }

    return (
        <div id='signup-component' className='container'>
            <Form onSubmit={handleSignUp}>
                    <FormGroup>
                        <Label for='first_name'>
                            First Name
                        </Label>
                        <Input
                            id='firstname-input-signup'
                            name='firstname'
                            placeholder='Enter your First Name'
                            type='text'
                            onChange={handleFirstNameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='last_name'>
                            Last Name
                        </Label>
                        <Input
                            id='lastname-input-signup'
                            name='lastname'
                            placeholder='Enter your Last Name'
                            type='text'
                            onChange={handleLastNameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='email'>
                            Email
                        </Label>
                        <Input
                            id='email-input-signup'
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
                            id='password-input-signup'
                            name='password'
                            placeholder='Enter your Password'
                            type='text'
                            onChange={handlePasswordChange}
                        />
                    </FormGroup>
                    {loading && !error ? <button type='button' id='loadingbutton'>Loading  <Spinner className='loginloadingspinner'></Spinner></button>:
                    <button type='submit' id='submitbutton'>
                        Submit
                    </button>}
                    <div className='container' id='signup-err'>
                    <Toast isOpen={error}>
                        <ToastHeader toggle={()=>{}}>
                            Unable to create account
                        </ToastHeader>
                        <ToastBody>
                            {errMsg != null ? "err" : ""}
                        </ToastBody>
                    </Toast>
                    </div>
                </Form>
        </div>
    )
}

export default SignUp