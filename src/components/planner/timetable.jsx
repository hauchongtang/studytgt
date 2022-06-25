import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from 'moment'
import { Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from 'classnames'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { getUniqueModules } from "../../data/parseImports";

const Timetable = ({moduleData, setSubmit}) => {
    const [activeTab, setActiveTab] = useState("1")

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
        <div style={{ backgroundColor: 'white', display: 'block', marginLeft: '160px', marginRight: 'auto' }}>
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
                        style={{ height: '65vh' }}
                    />
                    <div className="container"><h2 style={{ fontSize: '22px', marginTop: '12px', textDecoration: 'underline' }}><strong>Modules Imported</strong></h2></div>
                    <div className="container" style={{ display: 'flex' }}>
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
        </div>
    )
}

export default Timetable