import React, { useState } from "react";
import { Form, FormGroup, Input, Button, Spinner, Alert } from 'reactstrap';
import { changeParticulars } from "../../api/users";
import validateEmail from "../hooks/validateEmail";

const EditParticulars = ({ }) => {
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [toast, setToast] = useState(null)
  const [success, setSuccess] = useState(false)
  const refreshToken = localStorage.getItem("user")
  const user_id = localStorage.getItem("_id")

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

  const updateParticulars = async (formObj) => {
    const response = await changeParticulars(user_id, refreshToken, formObj, setError);

    if (!response.error) {
      setSuccess(true)
      setToast(response)
      setTimeout(() => setToast(null), 2000)
      setLoading(false)
      localStorage.setItem("user", response.refresh_token)
      localStorage.setItem("_id", response.user_id)
      localStorage.setItem("name", response.first_name + " " + response.last_name)
      localStorage.setItem("first_name", response.first_name)
      localStorage.setItem("last_name", response.last_name)
      localStorage.setItem("email", response.email)
      localStorage.setItem("points", response.points)
      localStorage.setItem("timetable", response.timetable) 
    }

    return response;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formObj = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password
    }
    setLoading(true)
    updateParticulars(formObj);
  }

  return (
    <Form onSubmit={handleSubmit}>
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
      {loading && !toast ? <Button type='submit' className={styles.button}>Loading  <Spinner className='loginloadingspinner'></Spinner></Button> :
        <Button type='submit' className={styles.button} onMouseOver={() => {
          if (error) setErrMsg("Submit")
        }}>
          {error ? errMsg : "Submit"}
        </Button>}
      <Alert style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', }} color={'danger'} isOpen={error}>
        Failed to sign up, try again
      </Alert>
      <Alert style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', }} color={'success'} isOpen={toast != null}>
        Success
      </Alert>
    </Form>
  )
}

export default EditParticulars