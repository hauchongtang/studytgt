import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, CardBody, Spinner } from 'reactstrap'
import { useParams } from 'react-router-dom'
import styles from '../Layout/Widget.module.css'
import TaskBubble from '../Layout/TaskBubble'
import EditParticulars from './EditParticulars'

import { getUserById, modifyAccountDetails, getTasksById, getAllUsers } from '../../api/users'
import { determineLevel } from '../hooks/determineLevel'
import MiniProfile from './MiniProfile'

const ProfilePage = ({ match }) => {
    // const { userIdentifier } = useParams();
    const first_name = localStorage.getItem("first_name")
    const last_name = localStorage.getItem("last_name")
    const email_ = localStorage.getItem("email")
    const refreshToken = localStorage.getItem("user")
    const { level, nextLevel, targetPointsToNextLevel, pts } = determineLevel(localStorage.getItem("points"));

    const [personalTasks, setPersonalTasks] = useState([])
    const [done, setDone] = useState(0)
    const [users, setUsers] = useState([])
    const [firstname, setFirstName] = useState(first_name !== null ? first_name : "")
    const [lastname, setLastName] = useState(last_name !== null ? last_name : "")
    const [email, setEmail] = useState(email_ !== null ? email_ : "")
    const [submitted, setSubmitted] = useState(false)
    const [success, setSuccess] = useState(true)
    const [points, setPoints] = useState(localStorage.getItem("points"))
    const [userId, setUserId] = useState("")
    const user_id = localStorage.getItem("_id")

    const getPersonalTasks = async () => {
        const result = await getTasksById(refreshToken, user_id);
        if (result != null) {
            result.sort((a, b) => Date.parse(b) - Date.parse(a));

            var doneCounter = 0
            result.forEach(item => {
                if (!item.hidden) doneCounter++;
            })
            setPersonalTasks(result)
            setDone(doneCounter)
        }
        return result.slice(0, 3)
    }

    const getAll = async () => {
        const result = await getAllUsers(refreshToken)
        for (var i = result.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * i)
            var k = result[i]
            result[i] = result[j]
            result[j] = k
        }
        setUsers(result)

        return result
    }

    useEffect(() => {
        getPersonalTasks()
        getAll()
    }, [])

    return (
        <div
            style={{
                backgroundColor: 'white',
                marginLeft: '160px',
                width: 'calc(100vw - 180px)',
            }}
        >
            <Container
                style={{
                }}
            >
                <Row
                    style={{
                        height: '100vh',
                        width: 'auto'
                    }}
                >
                    <Col className="" xs={4}>
                        <div style={{ height: '3vh' }} />
                        <Card
                            style={{
                                boxShadow: '0px 0px 18px 9px #9E9E9E20',
                                border: 'none',
                                borderRadius: '17px'
                            }}
                        >
                            <img
                                alt="Card image"
                                src="https://picsum.photos/300/200"
                                style={{
                                    borderTopLeftRadius: '17px',
                                    borderTopRightRadius: '17px'
                                }}
                            />
                            <CardBody>
                                <h5
                                    style={{
                                        fontSize: '2.5vh',
                                        textAlign: 'center',
                                    }}
                                >
                                    {`${first_name} ${last_name}`}
                                </h5>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <div style={{ borderRight: '0.2px solid grey', padding: '0px 12px 0px 12px' }}>{`Level: ${level}`}</div>
                                    <div style={{ borderRight: '0.2px solid grey', padding: '0px 12px 0px 12px' }}>{`Points: ${localStorage.getItem("points")}`}</div>
                                    <div style={{ padding: '0px 12px 0px 12px' }}>{`Done: ${done}`}</div>
                                </div>
                                <div
                                    style={{
                                        marginTop: '2vh'
                                    }}
                                >
                                    <h5>Recent Activity</h5>
                                    {personalTasks.length !== 0 && personalTasks.map((item, idx) => {
                                        if (idx < 3) return (
                                            (item.hidden === false) && <div className={styles.cardContainer} key={idx + 1 * 2} >
                                                <TaskBubble
                                                    id={item.ID}
                                                    title={item.taskName}
                                                    points={Number(item.duration) * 60 / 100}
                                                    subtitle={item.moduleCode}
                                                    // name={item.first_name + " " + item.last_name}
                                                    duration={item.duration}
                                                    date={item.updated_at}
                                                    hidden={item.hidden}
                                                />
                                            </div>
                                        )
                                    })}
                                    <div
                                        style={{
                                            textAlign: 'center'
                                        }}
                                    >
                                        {done === 0 && <Spinner />}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="" xs={8}>
                        <Row>
                            <div style={{ height: '3vh' }} />
                            <Card
                                style={{
                                    boxShadow: '0px 0px 18px 9px #9E9E9E20',
                                    border: 'none',
                                    borderRadius: '17px'
                                }}
                            >
                                <CardBody>
                                    <h5
                                        style={{
                                            fontSize: '3.5vh',
                                            textAlign: 'start',
                                        }}
                                    >
                                        Edit Profile
                                    </h5>
                                    <div style={{ height: '1vh' }} />
                                    <EditParticulars />
                                </CardBody>
                            </Card>
                        </Row>
                        <Row>
                            <div style={{ height: '1.5vh' }} />
                            <Card
                                style={{
                                    boxShadow: '0px 0px 18px 9px #9E9E9E20',
                                    border: 'none',
                                    borderRadius: '17px'
                                }}
                            >
                                <CardBody>
                                    <h5
                                        style={{
                                            fontSize: '3.5vh',
                                            textAlign: 'start',
                                        }}
                                    >
                                        Discover People
                                    </h5>
                                    <div style={{ height: '1vh' }} />
                                    <Container
                                    >
                                        <Row>
                                            {users.length > 0 && users.map((item, idx) => {
                                                if (idx < 9) return (
                                                    <Col xs={4} style={{ marginTop: '1vh' }}>
                                                        <MiniProfile data={item} key={item.user_id} />
                                                    </Col>
                                                )
                                            })}
                                            <div style={{ textAlign: 'center' }}>{users.length === 0 && <Spinner />}</div>
                                        </Row>
                                    </Container>
                                </CardBody>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfilePage