import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Collapse, FormFeedback } from "reactstrap";
import { setTimetableUrl } from "../../api/users";
import { getDatesOfTargetDay } from "../../data/mockdata";

import { parseUrl } from '../../data/parseImports'
import Timetable from "./timetable";

const Planner = ({}) => {
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
        await setLink(urllink, localStorage.getItem("user"), localStorage.getItem("_id"))
        await resolvePromise()
        setOpen(false)
    }

    const handleLinkChange = (event) => {
        if (!event.target.value.includes("://")) {
            setError(true)
        } else {
            setUrlLink(event.target.value)
            localStorage.setItem("timetable", event.target.value)
        }
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

    const processDay = (dayString) => {
        switch (dayString) {
            case "Monday":
                return 0;
            case "Tuesday":
                return 1;
            case "Wednesday":
                return 2;
            case "Thursday":
                return 3;
            case "Friday":
                return 4;
            default:
                return 1;
        }
    }

    const processLessonType = (lesson) => {
        switch (lesson) {
            case "Lecture":
                return "LEC"
            case "Tutorial":
                return "TUT"
            case "Laboratory" || "Lab":
                return "LAB"
            case "Sectional" || "Sectionals":
                return "SEC"
            default:
                return ""
        }
    }

    const processData = async (link) => {
        const data = await getModuleDataset(link)
        var result = [
        [{ }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }],
        [{ }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }],
        [{ }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }],
        [{ }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }],
        [{ }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }]]
        console.log(data)
        if (link === "") {
            return "no link"
        } else {
            for (var i = 0; i < data.length; i++) {
                var objKeys = Object.keys(data[i].moduleInfo)
                for (var key of objKeys) {
                    for (var object of data[i].moduleInfo[key][0]) {
                        console.log(object)
                        result[processDay(object.day)][(parseInt(object.startTime)/100) - 8].module = data[i].moduleCode
                        result[processDay(object.day)][(parseInt(object.startTime)/100) - 8].lessonType = processLessonType(object.lessonType)
                        result[processDay(object.day)][(parseInt(object.startTime)/100) - 8].classNo = object.classNo
                        result[processDay(object.day)][(parseInt(object.startTime)/100) - 8].first = true;
                        result[processDay(object.day)][(parseInt(object.startTime)/100) - 8].venue = object.venue;
                        // result[processDay(object.day)][((parseInt(object.endTime) - 100)/100) - 8].module = data[i].moduleCode
                        // result[processDay(object.day)][((parseInt(object.endTime) - 100)/100) - 8].lessonType = object.lessonType
                        // result[processDay(object.day)][((parseInt(object.endTime) - 100)/100) - 8].classNo = object.classNo
                        const duration = parseInt(object.endTime) - parseInt(object.startTime)
                        if (duration > 100) { 
                            for (var j = 0; j < duration / 100; j++) {
                                result[processDay(object.day)][((parseInt(object.startTime) + j*100)/100) - 8].module = data[i].moduleCode
                                result[processDay(object.day)][((parseInt(object.startTime) + j*100)/100) - 8].lessonType = processLessonType(object.lessonType)
                                result[processDay(object.day)][((parseInt(object.startTime) + j*100)/100) - 8].classNo = object.classNo
                                result[processDay(object.day)][((parseInt(object.startTime) + j*100)/100) - 8].venue = object.venue
                            }
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

    const valid = urllink.includes('https://nusmods.com/timetable') && urllink.includes("share")

    return (
        <div style={{ backgroundColor: 'white', padding: '4.2vh 250px 0px 4.5vh', height: '100vh', width: 'auto', overflowX: 'scroll' }}>
        <Button color="primary" style={{ marginLeft: '180px', marginBottom: '8px' }} onClick={() => setOpen(!open)}>{!open ? 'Open to import modules' : 'Hide'}</Button>
        <div 
            style={{ 
                marginLeft: '180px', marginBottom: '8px',
                fontSize: '20px', color: 'salmon' 
            }}
        >
            Click the module to find out more about it !
        </div>
        <Collapse isOpen={open} style={{ marginLeft: '160px',  }}>
            <div >
            {<Form onSubmit={handleOnSubmit} style={{display: 'flex', marginLeft: '20px'}}>
                <FormGroup>
                    <Input
                        onChange={handleLinkChange}
                        placeholder={'NUSmods import link'}
                        valid={valid}
                        invalid={!valid}
                        style={{ height: '40px', width: '30vw' }}
                    />
                    <FormFeedback>Invalid Link</FormFeedback>
                </FormGroup> 
                <Button style={{ height: '40px' }} type="submit">Submit</Button>
            </Form>} 
            </div>
        </Collapse>
            {dataAll !== null && <Timetable moduleData={dataAll}/>}
        </div>
    )
}

export default Planner