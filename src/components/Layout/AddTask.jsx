import React, { useState } from 'react';
import { useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button, FormFeedback, Spinner } from 'reactstrap';
import { addTask, getTasks } from '../../api/users';

const AddTaskWidget = ({ setPersonalTasks, personalTasks, uniqueModules }) => {
    const localUserData = {
        first_name: localStorage.getItem("first_name"),
        last_name: localStorage.getItem("last_name"),
        user_id: localStorage.getItem("_id"),
        refreshToken: localStorage.getItem("user")
    }
    const [name, setName] = useState("E.g. Assignment / Tutorial / Project")
    const [code, setCode] = useState(uniqueModules[0] === null ?  'E.g. CS1231S' : uniqueModules[0])
    const [duration, setDuration] = useState(0)
    const [loading, setLoading] = useState(false)

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
        
        const result = await addTask(localUserData.first_name, localUserData.last_name, name, code, duration, true, localUserData.user_id, localUserData.refreshToken) 
        setTimeout(() => {
            if (result.InsertedID !== undefined)
                localStorage.setItem("addedTaskID", result.InsertedID)
            else localStorage.setItem("addedTaskItem", "Failed to get ID")
        }
        , 250)
        setPersonalTasks([toAppend, ...personalTasks])
        setLoading(false)
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        await addFutureTask()
    }
    return (
        <>
        
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="taskname">Task Name</Label>
                <Input
                  valid={name.length >= 3}
                  invalid={name.length < 3 || name.includes("E.g.")}
                  placeholder={name} value={name}
                  name='taskname'
                  onChange={handleNameChange}
                  data-testid="taskname-input"
                ></Input>
                <FormFeedback>Task name is mandatory.</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for='modulecode'>Module Code</Label>
                <Input
                  type={uniqueModules[0] !== "No Modules" ?  'select' : 'text'}
                  valid={true} invalid={code.length <= 2}
                  placeholder={code} value={code}
                  name='modulecode'
                  onChange={handleModuleChange}
                  data-testid={'modulecode-input'}
                >
                    {uniqueModules !== null && uniqueModules.map((item, idx) => {
                        return (
                            <option key={idx}>{item}</option>
                        )
                    })}
                </Input>    
                <FormFeedback>You must input a module code.</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for='duration'>Duration (mins)</Label>
                <Input
                  valid={duration >= 15 }
                  invalid={duration < 15}
                  placeholder={duration}
                  value={duration}
                  name='duration'
                  onChange={handleDurationChange}
                  data-testid={'duration-input'}
                ></Input>
                <FormFeedback>Duration must be more than 15 mins !</FormFeedback>
            </FormGroup>
            <div style={{ textAlign: 'right', }}>
                <Button type="submit" disabled={duration < 15 && name === "E.g. Assignment / Tutorial / Project"} style={{ fontSize: '18px', padding: '8px 48px 8px 48px' }} data-testid={'add-button'}>
                    {!loading ? 'Add' : 'Loading'}
                    {loading && <>&nbsp;&nbsp;<Spinner style={{ height: '18px', width: '18px' }}/></>}
                </Button></div>
        </Form>
        </>
    )
}

export default AddTaskWidget;