import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Spinner } from "reactstrap";

import Timetable from "./timetable";

const Planner = () => {
    const [link, setLink] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleOnSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        localStorage.setItem("timetable", link)
    }

    const handleLinkChange = ({ target: { name, value } }) => {
        if (!value.includes("://")) {
            setError(true)
        } else setLink(value)
    }

    return (
        <div className="container">
            {localStorage.getItem("timetable") !== null && <Form onSubmit={handleOnSubmit} className="import">
                <h1 id="profilename">Import your timetable here</h1>
                <FormGroup>
                    <Label for="import-link">
                        Import link from <a href="nusmods.com">NUSmods</a> If you had inserted some fake link, you might want to logout and reinsert.
                    </Label>
                    <Input
                        invalid={error}
                        onChange={handleLinkChange}
                        placeholder={error && "Not a link !"}
                    />
                </FormGroup>
                {!loading ? <button type="submit" id="submitbutton">Submit</button> :
                <button type='button' id='loadingbutton'>Loading  <Spinner className='loginloadingspinner'></Spinner></button>}
            </Form>}
            { <Timetable />}
        </div>
    )
}

export default Planner