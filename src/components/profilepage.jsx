import React, { useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane, Form, FormGroup, Label, Input, Spinner, Card, CardTitle, CardBody, CardHeader, CardText } from 'reactstrap'
import classnames from 'classnames'

import { modifyAccountDetails } from '../api/users'

const ProfilePage = () => {
    const first_name = localStorage.getItem("first_name")
    const last_name = localStorage.getItem("last_name")
    const email_ = localStorage.getItem("email")
    const points = localStorage.getItem("points")
    const [activeTab, setActiveTab] = useState("1")
    const [firstname, setFirstName] = useState(first_name !== null ? first_name : "")
    const [lastname, setLastName] = useState(last_name !== null ? last_name : "")
    const [email, setEmail] = useState(email_ !== null ? email_ : "")
    const [submitted, setSubmitted] = useState(false)
    const [success, setSuccess] = useState(true)

    const handleFirstNameChange = ({ target: { name, value } }) => {
        setFirstName(value)
    }

    const handleLastNameChange = ({ target: { name, value } }) => {
        setLastName(value)
    }

    const handleEmailChange = ({ target: { name, value } }) => {
        setEmail(value)
    }

    const modifyUserDetails = async () => {
        const result = await modifyAccountDetails(firstname, lastname, email, setSuccess)
        return result
    }

    const handleSubmit = (event) => {
        localStorage.setItem("first_name", firstname)
        localStorage.setItem("last_name", lastname)
        localStorage.setItem("name", firstname + " " + lastname)
        // localStorage.setItem("email", email)
        setSubmitted(true)
    }

    const mockLastActivities = [
        {
            description: 'Read book',
            date: '28/5/2022',
            focusTime: '100',
            pointsGained: 10
        },
        {
            description: 'set up blog',
            date: '25/5/2022',
            focusTime: '120',
            pointsGained: 12
        },
        {
            description: 'Learning a new language',
            date: '15/5/2022',
            focusTime: '90',
            pointsGained: 9
        }
    ]

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
                <TabPane tabId="1" key={activeTab * Math.random()}>
                    <div id='profilepic'>
                        <img id='profilepic' src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png' />
                    </div>
                    <h1 id='profilename'>{first_name}</h1>
                    <h2 id='lastname'>{last_name}</h2>
                    <div id='points'><button id='points'>{"Points: " + points}</button> </div>
                    <div id='last'>{mockLastActivities.map((item, idx) => {
                        return (
                            <Card id='last-activity'>
                                <CardHeader tag="h4">
                                    {item.description}
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>
                                        {item.date}
                                    </CardTitle>
                                    <CardText tag="h6">
                                        {"Focus time: " + item.focusTime + " minutes"}
                                    </CardText>
                                    <CardText tag="h6">
                                        {"Points gained: " + item.pointsGained + " points"}
                                    </CardText>
                                </CardBody>
                            </Card>
                        )
                    })}</div>
                </TabPane>
                <TabPane tabId="2" key={Math.random() * activeTab}>
                    <Form>
                        <h1 id='profilename'>Change your name</h1>
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
                        {/* <FormGroup>
                            <Label for='email'>
                                Email
                            </Label>
                            <Input
                                id='email-input-signup'
                                name='email'
                                placeholder={email}
                                type='text'
                                invalid={false}
                                onChange={handleEmailChange}
                            />
                        </FormGroup> */}
                        {submitted && success ? <button type='button' id='loadingbutton'>Loading  <Spinner className='loginloadingspinner'></Spinner></button> :
                            <button type='submit' id='submitbutton' onClick={handleSubmit}>{!success ? "Try again" : "Submit"}</button>
                        }
                        <button type='button' id='cancelbutton' onClick={() => { setActiveTab("1") }}>Cancel</button>
                    </Form>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default ProfilePage