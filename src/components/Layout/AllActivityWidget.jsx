import React from "react";
import { useState, useEffect } from "react";

import LeaderboardBubble from "./LeaderboardBubble";
import TaskBubble from "./TaskBubble";
import { getAllUsers, getTasks } from "../../api/users";

import styles from './Widget.module.css'
import { Spinner } from "reactstrap";

const AllActivityWidget = ({ leaderboard, tasks }) => {
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <div
            style={{
                width: '100%', height: '100%', backgroundColor: 'white'

            }}
            className={styles.widget}
        >   
            <div style={{}}>
                <h3 className={styles.h3}>{tabIndex === 0 ? 'All Activity': 'Leaderboard'}</h3>
                <hr></hr>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                    <a className={`${styles.a} ${tabIndex === 0 ? styles.selected : ''}`} href="#allactivity" onClick={() => setTabIndex(0)}>All Activity</a>
                    <a className={`${styles.a} ${tabIndex === 1 ? styles.selected : ''}`} href="#leaderboard" onClick={() => setTabIndex(1)}>Leaderboard</a>
                </div>
            </div>
            <div className={styles.cardList}>
                {tabIndex === 0 && tasks.length !== 0 && tasks.map((item, idx) => {
                    return (
                        !item.hidden &&
                        <div className={styles.cardContainer} key={idx}>
                            <TaskBubble 
                                title={item.taskName} 
                                points={Number(item.duration) * 60 / 100} 
                                subtitle={item.moduleCode} 
                                name={item.first_name + " " + item.last_name} 
                                duration={item.duration} 
                                date={item.created_at} 
                            />
                        </div>
                    )
                })}
                {(tabIndex === 1 && leaderboard.length !== 0) && leaderboard.map((item, idx) => {
                    return (
                        <div className={styles.cardContainer} key={idx}>
                            <LeaderboardBubble title={item.first_name + " " + item.last_name} points={item.points} name={idx+1}/>
                        </div>
                    )
                })}
                {tabIndex === 0 && tasks.length === 0 && <Spinner type="grow" color="danger" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '200px' }} />}
                {tabIndex === 1 && leaderboard.length === 0 && <Spinner type="grow" color="danger" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '200px' }} />}
            </div>
        </div>
    )
}

export default AllActivityWidget

const mockData = [
    {
        name: 'Hau Chong',
        taskName: 'Assignment',
        moduleCode: 'CS2100',
        duration: '',
        hidden: false
    },
    {
        name: 'Hau Chong',
        taskName: 'Tutorial',
        moduleCode: 'CS2105',
        duration: '',
        hidden: true
    },
    {
        name: 'Hau Chong',
        taskName: 'Project',
        moduleCode: 'CS2102',
        duration: '',
        hidden: false
    },
        {
        name: 'Hau Chong',
        taskName: 'Project',
        moduleCode: 'CS2102',
        duration: '',
        hidden: false
    },
        {
        name: 'Hau Chong',
        taskName: 'Project',
        moduleCode: 'CS2102',
        duration: '',
        hidden: false
    },
        {
        name: 'Hau Chong',
        taskName: 'Project',
        moduleCode: 'CS2102',
        duration: '',
        hidden: false
    },
        {
        name: 'Hau Chong',
        taskName: 'Project',
        moduleCode: 'CS2102',
        duration: '',
        hidden: false
    },
        {
        name: 'Hau Chong',
        taskName: 'Project',
        moduleCode: 'CS2102',
        duration: '',
        hidden: false
    },
        {
        name: 'Hau Chong',
        taskName: 'Project',
        moduleCode: 'CS2102',
        duration: '',
        hidden: false
    },
        {
        name: 'Hau Chong',
        taskName: 'Project',
        moduleCode: 'CS2102',
        duration: '',
        hidden: false
    },
        {
        name: 'Hau Chong',
        taskName: 'Project',
        moduleCode: 'CS2102',
        duration: '',
        hidden: false
    },
        {
        name: 'Hau Chong',
        taskName: 'Project',
        moduleCode: 'CS2102',
        duration: '',
        hidden: false
    },
        {
        name: 'Hau Chong',
        taskName: 'Project',
        moduleCode: 'CS2102',
        duration: '',
        hidden: false
    },
]