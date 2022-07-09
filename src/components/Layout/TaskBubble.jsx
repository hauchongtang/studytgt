import React from 'react'
import { Card, CardTitle, CardSubtitle, CardBody, Badge, CardText } from 'reactstrap'
import moment from 'moment'
import { useNavigate } from "react-router-dom";

import styles from './TaskBubble.module.css'

const TaskBubble = ({ id, title, subtitle, name, points, duration, date, hidden, onClick, onHover }) => {
    const fromString = moment(date).fromNow()
    const navigate = useNavigate()

    const handleOnClick = (event) => {
        event.preventDefault()
        var task = {
            title,
            subtitle,
            name,
            duration,
            id: id !== undefined ? id : localStorage.getItem("addedTaskID")
        }

        localStorage.setItem("timerObj", JSON.stringify(task))
        navigate("/timer", {replace: false})
    }
    return (
        <>
            <Card  style={{ backgroundColor: hidden ? 'rgba(255, 165, 0, 0.3)' : 'rgba(50,205,50, 0.1)' }} onClick={onClick ? handleOnClick : () => {}} onMouseOver={onHover}>
                <CardBody id={hidden ? 'pending' : ''}>
                    <CardTitle tag='div' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h6 style={{ fontWeight: '600', wordBreak: 'break-word' }}>{title}</h6>
                        <h6>{name}</h6>
                    </CardTitle>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                        <Badge color='success'>
                            {subtitle}
                        </Badge>
                        <div style={{ width: '4px' }}></div>
                        <Badge color='primary'>{points} Points</Badge>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '12px' }}>
                        <h6 style={{ marginBottom: '0px', fontSize: '14px', fontWeight: '400' }}>For {duration} minutes</h6>
                        <h6 style={{ marginBottom: '0px', fontSize: '14px', fontWeight: '400'}}>{fromString}</h6>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default TaskBubble