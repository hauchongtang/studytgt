import React, { useState } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { addTask } from '../../api/users';

const AddTaskWidget = ({ setTasks, tasks }) => {
    const localUserData = {
        first_name: localStorage.getItem("first_name"),
        last_name: localStorage.getItem("last_name"),
        user_id: localStorage.getItem("_id"),
        refreshToken: localStorage.getItem("user")
    }
    const [name, setName] = useState("E.g. Assignment / Tutorial / Project")
    const [code, setCode] = useState("E.g. CS1231S")
    const [duration, setDuration] = useState(0)

    const addFutureTask = async () => {
        const toAppend = {
            taskName: name,
            moduleCode: code,
            duration: duration,
            hidden: true,
            first_name: localUserData.first_name,
            last_name: localUserData.last_name,
            created_at: new Date()
        }
        setTasks([toAppend, ...tasks])
        const result = await addTask(localUserData.first_name, localUserData.last_name, name, code, duration, true, localUserData.user_id, localUserData.refreshToken)
        return result
    }
    const handleNameChange = ({ target: { name, value } }) => {
        setName(value)
    }

    const handleModuleChange = (event) => {
        event.preventDefault()
        setCode(event.target.value)
    }

    const handleDurationChange = (event) => {
        event.preventDefault()
        setDuration(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addFutureTask()
    }
    return (
        <>
        
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="taskname">Task Name</Label>
                <Input placeholder={name} value={name} name='taskname' onChange={handleNameChange}></Input>
            </FormGroup>
            <FormGroup>
                <Label for='modulecode'>Module Code</Label>
                <Input placeholder={code} value={code} name='modulecode' onChange={handleModuleChange}></Input>
            </FormGroup>
            <FormGroup>
                <Label for='duration'>Duration (mins)</Label>
                <Input placeholder={duration} value={duration} name='duration' onChange={handleDurationChange}></Input>
            </FormGroup>
            <Button type="submit">Submit</Button>
        </Form>
        </>
    )
}

export default AddTaskWidget;