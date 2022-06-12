import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from 'moment'
import { Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from 'classnames'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import mockEventsData, { getUniqueModules } from "../../data/mockdata";
import AddNewTask from "./addnewtask";


const setColorMapping = () => {
    for (var moduleCode of getUniqueModules()) {
        if (moduleCode === 'CS2101') { localStorage.setItem(moduleCode, 'red') }

        if (moduleCode === 'CS2102') { localStorage.setItem(moduleCode, 'blue') }

        if (moduleCode === 'CS2103') { localStorage.setItem(moduleCode, 'pink') }
    }
}

const getColorMapping = (event) => {
    var result = []
    for (var moduleCode of getUniqueModules()) {
        result.push((event.title.includes(moduleCode) && {
            style: {
                backgroundColor: localStorage.getItem(moduleCode)
            }
        }))
    }

    console.log(result)
    return result
}

const Timetable = () => {
    const [activeTab, setActiveTab] = useState("1")
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(0)
    const [title, setTitle] = useState("")
    const [date, setDate] = useState(null)
    const [data, setData] = useState(mockEventsData)
    localStorage.setItem('moduleData', JSON.stringify(mockEventsData))

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
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

    const { components } = useMemo(
        () => ({
            components: {
            }
        }),
        []
    )

    const { defaultDate, formats } = useMemo(
        () => ({
            defaultDate: new Date(2015, 3, 13),
            formats: {
                eventTimeRangeFormat: ({ start, end }, culture, localizer) => '',
            },
        }),
        []
    )

    const eventPropGetter = useCallback(
        (event, start, end, isSelected) => ({
            ...(isSelected && {
                style: {
                    backgroundColor: '#000',
                },
            }),
            ...(moment(start).hour() < 12 && {
                className: 'powderBlue',
            }),
            ...(event.title.includes(getUniqueModules()[0]) && {
                style: {
                    backgroundColor: localStorage.getItem(getUniqueModules()[0])
                }
            }),
            ...(event.title.includes(getUniqueModules()[1]) && {
                style: {
                    backgroundColor: localStorage.getItem(getUniqueModules()[1])
                }
            }),
            ...(event.title.includes(getUniqueModules()[2]) && {
                style: {
                    backgroundColor: localStorage.getItem(getUniqueModules()[2])
                }
            }),
            ...(event.title.includes(getUniqueModules()[3]) && {
                style: {
                    backgroundColor: localStorage.getItem(getUniqueModules()[3])
                }
            }),
            ...(event.title.includes(getUniqueModules()[4]) && {
                style: {
                    backgroundColor: localStorage.getItem(getUniqueModules()[4])
                }
            })
        }),
        []
    )

    const handleSubmit = () => {
        setData([...data, {
            title: title,
            allDay: false,
            start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), from),
            end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), to),
        }])
        console.log(data)
    }

    useEffect(() => {
        setColorMapping()
    }, [])

    return (
        <div className="timetable" id="timetable">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames(
                            { active: activeTab === "1" }
                        )}
                        onClick={() => { setActiveTab("1") }}
                        href="#"
                    >
                        Timetable
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames(
                            { active: activeTab === "2" }
                        )}
                        onClick={() => { setActiveTab("2") }}
                        href="#1"
                    >
                        Add a new task !
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId={"1"} key={activeTab * Math.random()}>
                    <Calendar
                        localizer={momentLocalizer(moment)}
                        events={data}
                        defaultView={Views.WEEK}
                        min={new Date(2022, 5, 1, 8)}
                        max={new Date(2022, 5, 1, 19)}
                        components={components}
                        formats={formats}
                        eventPropGetter={eventPropGetter}
                        onSelectEvent={() => console.log('hello')}
                        style={{ height: '80%' }}
                    />
                    <div className="container"><h2 style={{ fontSize: '24px', marginTop: '16px', textDecoration: 'underline' }}><strong>Modules Imported</strong></h2></div>
                    <div className="flex-container" style={{ display: 'flex' }}>
                        {getUniqueModules().map((item, idx) => {
                            return (
                                <div style={{ width: '110px', marginRight: '16px', marginLeft: '16px', marginTop: '16px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div className='container'><h3 style={{ fontSize: '20px' }}><strong>{item}</strong></h3>
                                            <h6>4 MCs</h6>
                                        </div>
                                        <button id="color" style={{ backgroundColor: localStorage.getItem(item) }}></button>
                                    </div>

                                </div>
                            )
                        })}
                    </div>

                </TabPane>
                <TabPane tabId={"2"} key={2 * Math.random()}>
                    <>
                        <Form>
                            <FormGroup>
                                <Label for='title'>
                                    Title
                                </Label>
                                <InputName handleTitleChange={handleTitleChange} title={title} />
                                <Label for='title'>
                                    Duration
                                </Label>
                                <Input
                                    id='duration'
                                    name='duration'
                                    type='select'
                                    value={from}
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
                                    value={to}
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
                                    value={date}
                                    type="date"
                                    onChange={handleDateChange}
                                />
                            </FormGroup>
                            <div className="container" style={{textAlign: 'center'}}><button type='submit' id='loginbutton' onClick={handleSubmit}>Submit</button></div>
                        </Form>
                    </>
                </TabPane>
            </TabContent>
        </div>
    )
}

const InputName = ({ handleTitleChange, title }) => {
    return (
        <Input
            id='title'
            name='title'
            type='text'
            onChange={handleTitleChange}
            value={title}
            autoFocus
        />
    )
}

export default Timetable