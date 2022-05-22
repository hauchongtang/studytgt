import React, { useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Form, FormGroup, Label, Input, Spinner } from 'reactstrap'
import classnames from 'classnames'

const ProfilePage = () => {    
    const first_name = localStorage.getItem("first_name")
    const last_name = localStorage.getItem("last_name")
    const email_ = localStorage.getItem("email")
    const [activeTab, setActiveTab] = useState("1")
    const [firstname, setFirstName] = useState(first_name !== null ? first_name : "")
    const [lastname, setLastName] = useState(last_name !== null ? last_name : "")
    const [email, setEmail] = useState(email_ !== null ? email_ : "")
    const [submitted, setSubmitted] = useState(false)

    const handleFirstNameChange = ({ target: { name, value } }) => {
        setFirstName(value)
    }

    const handleLastNameChange = ({ target: { name, value } }) => {
        setLastName(value)
    }

    const handleEmailChange = ({ target: { name, value } }) => {
        setEmail(value)
    }
    
    return (
        <div id='profile-component' className='container'>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames(
                            { active: activeTab === "1" }
                        )}
                        onClick={() => { setActiveTab("1") }}
                        href="#"
                    >
                        Profile
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames(
                            { active: activeTab === "2" }
                        )}
                        onClick={() => { setActiveTab("2") }}
                        href="#"
                    >
                        Account Settings
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <h4>
                                Tab 1 Contents
                            </h4>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Form>
                        <FormGroup>
                            <Label for='first-name'>
                                First Name
                            </Label>
                            <Input
                                id='firstname-input-signup'
                                name='firstname'
                                placeholder={firstname}
                                type='text'
                                onChange={handleFirstNameChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='first-name'>
                                Last Name
                            </Label>
                            <Input
                                id='firstname-input-signup'
                                name='firstname'
                                placeholder={lastname}
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
                                placeholder={email}
                                type='text'
                                onChange={handleEmailChange}
                            />
                        </FormGroup>
                        {submitted ? <button type='button' id='loadingbutton'>Loading  <Spinner className='loginloadingspinner'></Spinner></button> :
                            <button type='submit' id='submitbutton' onClick={() => setSubmitted(true)}>Submit</button>
                        }
                        <button type='button' id='cancelbutton' onClick={() => {setActiveTab("1")}}>Cancel</button>
                    </Form>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default ProfilePage