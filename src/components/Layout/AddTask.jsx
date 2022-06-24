import React, { useState } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

const AddTaskWidget = () => {
    const [name, setName] = useState("")
    const handleNameChange = ({ target: { name, value } }) => {
        setName(value)
    }

    const handleSubmit = () => {}
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="taskname">Task Name</Label>
                <Input name='taskname'></Input>
            </FormGroup>
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default AddTaskWidget;