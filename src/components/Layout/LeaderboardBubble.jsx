import React from 'react'
import { Card, CardTitle, CardSubtitle, CardBody, Badge, CardText } from 'reactstrap'

import styles from './TaskBubble.module.css'

const LeaderboardBubble = ({ title, subtitle, name, points }) => {
    var hours = Math.round(Number(points) / 6000)
    const determineBadgeFirstTask = () => {
        return hours >= 0
    }

    const determineBadgeFirstHour = () => {
        return hours >= 1
    }

    const determineBadgeOneDay = () => {
        return hours >= 24
    }

    const determineBadgeOneWeek = () => {
        return hours >= 24*7
    }

    const determineBadgeOneMonth = () => {
        return hours >= 24*7*30
    }

    const determineBadgeOneYear = () => {
        return hours >= 24*7*30*364
    }
    return (
        <>
            <Card>
                <CardBody>
                    <CardTitle tag='h5' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h6 style={{ fontWeight: '600' }}>{title}</h6>
                        <h6>#{name}</h6>
                    </CardTitle>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>                        
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                           {determineBadgeFirstTask() && <> 1️⃣</>}
                           {determineBadgeFirstHour() && <>⭐</>}
                           {determineBadgeOneDay() && <>⭐</>}
                           {determineBadgeOneWeek() && <>⭐</>}
                           {determineBadgeOneMonth() && <>⭐</>}
                           {determineBadgeOneYear() && <>❣️</>}
                        </div> 
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Badge color='success'>{Math.round(Number(points) / 6000)} Hours</Badge>
                            <div style={{ width: '4px' }}></div>
                            <Badge color='primary'>{points} Points</Badge>
                        </div>
                   
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default LeaderboardBubble