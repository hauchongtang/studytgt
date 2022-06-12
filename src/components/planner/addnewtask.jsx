import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const AddNewTask = ({setTitle, setFrom, setTo, setDate, title, from, to, date}) => {
    const handleTitleChange = ({ target: { name, value } }) => {
        setTitle(value)
    }
    const handleFromChange = ({ target: { name, value } }) => {
        setFrom(value)
    }
    const handleToChange = ({ target: { name, value } }) => {
        setTo(value)
    }
    const handleDateChange = ({ target: { name, value } }) => {
        setDate(value)
    }
    return (
        <>
            <FormGroup>
                <FormGroup>
                    <Label for='title'>
                        Title
                    </Label>
                    <Input
                        id='title'
                        name='title'
                        type='text'
                        onChange={handleTitleChange}
                    />
                    <Label for='title'>
                        Duration
                    </Label>
                    <Input
                        id='duration'
                        name='duration'
                        type='select'
                        placeholder={from}
                        onChange={handleFromChange}
                    >
                        {
                            [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((item, idx) => {
                                return (
                                    <option key={idx}>{item}</option>
                                )
                            })
                        }
                    </Input>
                    <Input
                        id="to"
                        name="to"
                        type='select'
                        placeholder={to}
                        onChange={handleToChange}
                    >
                        {
                            [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((item, idx) => {
                                return (
                                    <option key={idx}>{item}</option>
                                )
                            })
                        }
                    </Input>
                    <Label for="exampleDate">
                        Date
                    </Label>
                    <Input
                        id="exampleDate"
                        name="date"
                        placeholder={date}
                        type="date"
                        onChange={handleDateChange}
                    />
                </FormGroup>
            </FormGroup>
        </>
    )
}

export default AddNewTask