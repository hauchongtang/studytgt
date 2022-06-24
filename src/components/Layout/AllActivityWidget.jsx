import React from "react";
import { useState, useEffect } from "react";

import LeaderboardBubble from "./LeaderboardBubble";
import TaskBubble from "./TaskBubble";
import { getAllUsers } from "../../api/users";

import styles from './Widget.module.css'

const AllActivityWidget = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const [result, setResult] = useState([])
    const refreshToken = localStorage.getItem("user")
    const getAll = async () => {
        const result = await getAllUsers(refreshToken)
        setResult(result)
        return result
    }    

    useEffect(() => {
        getAll()
    },[])

    console.log(result)
    return (
        <div
            style={{
                width: '100%', height: '100%', backgroundColor: 'white'

            }}
            className={styles.widget}
        >   
            <div style={{}}>
                <h3 className={styles.h3}>{tabIndex === 0 ? 'All Activity': 'Leaderboard'}</h3>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                    <a className={`${styles.a} ${tabIndex === 0 ? styles.selected : ''}`} href="#allactivity" onClick={() => setTabIndex(0)}>All Activity</a>
                    <a className={`${styles.a} ${tabIndex === 1 ? styles.selected : ''}`} href="#leaderboard" onClick={() => setTabIndex(1)}>Leaderboard</a>
                </div>
            </div>
            <div className={styles.cardList}>
                {tabIndex === 0 && mockData.map((item, idx) => {
                    return (
                        <div className={styles.cardContainer} key={idx}>
                        <TaskBubble title={item.taskName} subtitle={item.moduleCode} name={item.name} />
                        </div>
                    )
                })}
                {tabIndex === 1 && result.length !== 0 && result.map((item, idx) => {
                    return (
                        <div className={styles.cardContainer} key={idx}>
                            <LeaderboardBubble title={item.first_name + " " + item.last_name} points={item.points} name={idx+1}/>
                        </div>
                    )
                })}
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