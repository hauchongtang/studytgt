import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Spinner, Collapse } from "reactstrap";
import { setTimetableUrl } from "../../api/users";
import { getDatesOfTargetDay } from "../../data/mockdata";

import { parseUrl } from '../../data/parseImports'
import Timetable from "./timetable";

const Planner = () => {
    const [urllink, setUrlLink] = useState("")
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [dataAll, setDataAll] = useState(null)

    var dataGlob = []

    const getModuleDataset = async (link) => {
        const result = await parseUrl(link === "" ? localStorage.getItem("timetable") : link)
        return result
    }

    const setLink = async (link, refreshToken, id) => {
        const result = await setTimetableUrl(link, refreshToken, id)
        return result
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        localStorage.setItem("timetable", urllink)
        setLink(urllink, localStorage.getItem("user"), localStorage.getItem("_id"))
        resolvePromise()
        // window.location.reload()
    }

    const handleLinkChange = (event) => {
        if (!event.target.value.includes("://")) {
            setError(true)
        } else setUrlLink(event.target.value)
    }

    const processString = (str) => {
        if (str.length === 3) {
            return str.substring(0, 1)
        }
        if (str.length === 4) {
            return str.substring(0, 2)
        }
        return str
    }

    const processData = async (link) => {
        const data = await getModuleDataset(link)
        var result = []
        if (link === "") {
            return "no link"
        } else {
            var idx = 0
            for (var i = 0; i < data.length; i++) {
                var objKeys = Object.keys(data[i].moduleInfo)
                for (var key of objKeys) {
                    for (var object of data[i].moduleInfo[key][0]) {
                        const obj = object
                        const daysOfWeek = getDatesOfTargetDay(obj.day, 0)
                        for (var d of daysOfWeek) {
                            const currentDate = new Date(d)
                            const startTime = processString(obj.startTime)
                            const endTime = processString(obj.endTime)
                            var toAdd = {
                                id: idx,
                                title: data[i].moduleCode,
                                allDay: false,
                                start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startTime),
                                end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endTime)
                            }

                            result.push(toAdd)
                            idx++
                        }
                    }

                }
            }
        }

        return result
    }

    const resolvePromise = async (link) => {
        if (urllink !== "") {
            const result = await processData(urllink)
            setDataAll(result)
            localStorage.setItem("moduleData", JSON.stringify(result))
            return result
        } else {
            const url = localStorage.getItem("timetable")
            const result = await processData(url)
            setDataAll(result)
            localStorage.setItem("moduleData", JSON.stringify(result))
            return result
        }
    }

    useEffect(() => {
        resolvePromise()

    },[])

    return (
        <div className="container">
        <button id="open-imports" onClick={() => setOpen(!open)}>{!open ? 'Open to import modules' : 'Hide'}</button>
        <Collapse isOpen={open}>
            {<Form onSubmit={handleOnSubmit} className="import">
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
                {dataAll === null ? <button type="submit" id="submitbutton">Submit</button> :
                    <button type='submit' id='loadingbutton'>Update</button>}
            </Form>}
        </Collapse>
            {dataAll !== null && <Timetable moduleData={dataAll} />}
        </div>
    )
}

export default Planner