import React from 'react'
import { Card, CardTitle, CardSubtitle, CardBody, Badge, CardText } from 'reactstrap'
import moment from 'moment'

import styles from './TaskBubble.module.css'

const TaskBubble = ({ title, subtitle, name, points, duration, date, hidden }) => {
    const fromString = moment(date).fromNow()
    return (
        <>
            <Card>
                <CardBody>
                    <CardTitle tag='div' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h6 style={{ fontWeight: '600' }}>{title}</h6>
                        <h6>{hidden ? 'Anonoymous User' : name}</h6>
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