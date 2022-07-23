import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Spinner, Button } from 'reactstrap'
import { useParams } from 'react-router-dom';
import { getTasksById, getUserById } from "../../api/users";
import TaskBubble from '../Layout/TaskBubble';
import { determineLevel } from "../hooks/determineLevel";

const styles = {}

const UserProfile = () => {
  const [done, setDone] = useState("");
  const [user, setUser] = useState(null);
  const [personalTasks, setPersonalTasks] = useState([]);
  const [lvlObj, setLvlObj] = useState(null);
  const { id } = useParams();
  const refreshToken = localStorage.getItem("user")

  const getPersonalTasks = async () => {
    const result = await getTasksById(refreshToken, id);
    if (result) {
      result.sort((a, b) => Date.parse(b) - Date.parse(a));
      
      var doneCounter = 0
      result.forEach(item => {
        if (!item.hidden) doneCounter++;
      })
      if (doneCounter > 0) setDone(doneCounter)
      setPersonalTasks(result)
    }
    return result.slice(0,3)
  }

  const getUser = async () => {
    const result = await getUserById(refreshToken, id);
    if (!result.error) {
      setUser(result)
      setLvlObj(determineLevel(result.points));
    }
    return result;
  }

  useEffect(() => {
    getPersonalTasks();
    getUser();
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
        {user && <Row
          style={{
            height: '100vh',
            width: 'auto'
          }}
        >
          <Col style={{ textAlign: 'right' }}>
            <div style={{ height: '3vh' }} />
            <Button>
              <a href="/profile" style={{ textDecoration: 'none', color: 'white' }}>Back</a>
            </Button>
          </Col>
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
              {user != null && <CardBody>
                <h5
                  style={{
                    fontSize: '2.5vh',
                    textAlign: 'center',
                  }}
                >
                  {`${user.first_name} ${user.last_name}`}
                </h5>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ borderRight: '0.2px solid grey', padding: '4px 12px 4px 12px' }}>{`Level: ${lvlObj.level}`}</div>
                  <div style={{ borderRight: '0.2px solid grey', padding: '4px 12px 4px 12px' }}>{`Points: ${user.points}`}</div>
                  <div style={{ padding: '4px 12px 4px 12px' }}>{`Done: ${done}`}</div>
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
                    {done === "" && <div style={{ marginTop: '2vh' }}>No Tasks</div>}
                  </div>
                </div>
              </CardBody>}
            </Card>
          </Col>
          <Col>
                    &nbsp;
          </Col>
        </Row>}
        {!user && <div style={{ textAlign: 'center', height: '90vh', paddingTop: '40vh', backgroundColor: 'transparent' }}><Spinner /></div>}
      </Container>
    </div>
  )
}

export default UserProfile;