import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from 'moment'
import { Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from 'classnames'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { getUniqueModules } from "../../data/parseImports";
import CalendarLayout from "./CalendarLayout";

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
        <div style={{ backgroundColor: 'white', marginLeft: '160px', marginRight: 'auto' }}>
                    <CalendarLayout moduleData={moduleData} uniqueModules={getUniqueModules()}/>
        </div>
    )
}

export default Timetable