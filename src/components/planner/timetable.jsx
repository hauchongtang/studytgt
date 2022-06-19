import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from 'moment'
import { Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from 'classnames'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { getUniqueModules } from "../../data/parseImports";

const Timetable = ({moduleData}) => {
    const [activeTab, setActiveTab] = useState("1")
    // const [from, setFrom] = useState(8)
    // const [to, setTo] = useState(8)
    // const [title, setTitle] = useState("")
    // const [date, setDate] = useState(null)
    // const [data, setData] = useState(moduleData)

    // const handleTitleChange = (event) => {
    //     event.preventDefault()
    //     setTitle(event.target.value)
    // }
    // const handleFromChange = (event) => {
    //     event.preventDefault()
    //     setFrom(event.target.value)
    // }
    // const handleToChange = (event) => {
    //     event.preventDefault()
    //     setTo(event.target.value)
    // }
    // // const handleDateChange = ({ target: { name, value } }) => {
    // //     console.log(value)
    // //     setDate(value)
    // // }

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
            ...{style: {color: 'white'}},
            ...(moment(start).hour() < 12 && {
                className: 'powderBlue',
            }),
            ...(event.title.includes(getUniqueModules()[0]) && {
                style: {
                    backgroundColor:colorMapper(0),
                    color: 'white'
                }
            }),
            ...(event.title.includes(getUniqueModules()[1]) && {
                style: {
                    backgroundColor: colorMapper(1),
                    color: 'white'
                }
            }),
            ...(event.title.includes(getUniqueModules()[2]) && {
                style: {
                    backgroundColor:colorMapper(2),
                    color: 'white'
                }
            }),
            ...(event.title.includes(getUniqueModules()[3]) && {
                style: {
                    backgroundColor:colorMapper(3),
                    color: 'white'
                }
            }),
            ...(event.title.includes(getUniqueModules()[4]) && {
                style: {
                    backgroundColor: colorMapper(4),
                    color: 'white'
                }
            })
        }),
        []
    )

    // console.log(moduleData)

    // const handleSubmit = (response) => {
    //     if (date !== null)
    //     setData([...moduleData, {
    //         id: data.length,
    //         title: title,
    //         allDay: false,
    //         start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), from),
    //         end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), to),
    //     }])
    //     // console.log(data)
    // }

    const colorMapper = (idx) => {
        switch (idx) {
            case 1:
                return 'green'
            case 2:
                return 'purple'
            case 3:
                return 'grey'
            case 4:
                return 'brown'
            case 5:
                return 'orange'
            case 6:
                return 'powderblue'
            case 7:
                return 'darkgreen'
            default:
                return 'black'
        }
    }

    useEffect(() => {
        getUniqueModules()

    },[activeTab])

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
                        events={moduleData}
                        defaultView={Views.WEEK}
                        min={new Date(2022, 5, 1, 8)}
                        max={new Date(2022, 5, 1, 23)}
                        components={components}
                        formats={formats}
                        eventPropGetter={eventPropGetter}
                        onSelectEvent={() => console.log('hello')}
                        style={{ height: '80%' }}
                    />
                    <div className="container"><h2 style={{ fontSize: '22px', marginTop: '12px', textDecoration: 'underline' }}><strong>Modules Imported</strong></h2></div>
                    <div className="flex-container" style={{ display: 'flex' }}>
                        {getUniqueModules().length > 0 && getUniqueModules().map((item, idx) => {
                            return (
                                <div style={{ width: '130px', marginRight: '16px', marginLeft: '16px', marginTop: '16px' }} key={idx}>
                                    <div style={{ display: 'flex' }}>
                                        <div className='container'><h3 style={{ fontSize: '20px' }}><strong>{item}</strong></h3>
                                            <h6>4 MCs</h6>
                                        </div>
                                        <button id="color" style={{ backgroundColor: colorMapper(idx) }}></button>
                                    </div>

                                </div>
                            )
                        })}
                    </div>

                </TabPane>
                <TabPane tabId={"2"} key={2 * Math.random()}>
                    <>
                        {/* <Form onSubmit={handleSubmit}>
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
                                    onChange={(event) => {
                                        event.preventDefault()
                                        setDate(event.target.valueAsDate)
                                    }}
                                />
                            </FormGroup>
                            <div className="container" style={{textAlign: 'center'}}><button type='submit' id='loginbutton'>Submit</button></div>
                        </Form> */}
                    </>
                </TabPane>
            </TabContent>
        </div>
    )
}

// const InputName = ({ handleTitleChange, title }) => {
//     return (
//         <Input
//             id='title'
//             name='title'
//             type='text'
//             onChange={handleTitleChange}
//             value={title}
//             autoFocus
//         />
//     )
// }

export default Timetable