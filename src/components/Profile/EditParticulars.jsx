import React, { useState } from "react";
import { Form, FormGroup, Input, Button, Spinner } from 'reactstrap';
import validateEmail from "../hooks/validateEmail";

const EditParticulars = ({ }) => {
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [toast, setToast] = useState(false)
  const [success, setSuccess] = useState(false)

  const inputStyle = {}
  const styles = {}

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

  return (
    <Form>
      <FormGroup>
        <Input
          type="text"
          placeholder="First Name"
          // valid={firstname.length > 0}
          // invalid={firstname.length <= 0}
          onChange={handleFirstNameChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          id='lastname-input-signup'
          name='lastname'
          placeholder='Last Name'
          type='text'
          onChange={handleLastNameChange}
          // valid={lastname.length > 0}
          // invalid={lastname.length <= 0}
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
    </Form>
  )
}

export default EditParticulars