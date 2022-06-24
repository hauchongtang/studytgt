import React from 'react'
import { Card, CardTitle, CardSubtitle, CardBody, Badge, CardText } from 'reactstrap'

import styles from './TaskBubble.module.css'

const TaskBubble = ({ title, subtitle, name, points }) => {
    return (
        <>
            <Card>
                <CardBody>
                    <CardTitle tag='h5' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h6 style={{ fontWeight: '600' }}>{title}</h6>
                        <h6>{name}</h6>
                    </CardTitle>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                        <Badge color='success'>
                            {subtitle}
                        </Badge>
                        <div style={{ width: '4px' }}></div>
                        <Badge color='primary'>{points} Points</Badge>
                    </div>
                    <h6 style={{ textAlign: 'right',  marginBottom: '0px', fontSize: '14px', fontWeight: '400'}}>11m ago</h6>
                </CardBody>
            </Card>
        </>
    )
}

export default TaskBubble