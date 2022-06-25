import React, { useState } from "react";
import { Card, CardBody, CardTitle, InputGroup, InputGroupText, Input, Button } from "reactstrap";
import ToDoComponent from "./ToDoComponent";

import styles from './Widget.module.css'

function ToDoWidget({ backgroundColor, title, subtitle, name, points, duration, date, hidden }) {
    const [todo, setTodo] = useState([])
    const [taskname, setTaskName] = useState("")

    const handleTaskChange = (event) => {
        event.preventDefault()
        setTaskName(event.target.value)
    }

    const addTask = () => {
        const taskObj = {
            name: taskname,
            idx: todo.length+1
        }

        setTodo([taskObj, ...todo])
    }

    return (
        <div
            style={{
                width: 'auto', height: '100%', backgroundColor,

            }}
            className={styles.widget}
        >
            <h3 className={styles.h3}>Plan your pomodoro tasks here</h3>
            <div style={{ height: '16px' }}></div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div style={{ width: '620px' }}>
                    <InputGroup>
                        <InputGroupText>
                            Task
                        </InputGroupText>
                        <Input style={{ height: '64px' }} onChange={handleTaskChange} value={taskname} placeholder='Enter the mini task' />
                    </InputGroup>
                </div>
                <Button style={{ width: '100px'}} onClick={addTask}>Add Task</Button>
            </div>
            <div style={{ width: '720px', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '32px' }}>{todo.map((item, idx) => {
                return (
                    <div key={idx}>
                        <ToDoComponent title={item.name} />
                    </div>
                )
            })}
            </div>
        </div>
    );
}

export default ToDoWidget