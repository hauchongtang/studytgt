import React, { useState, useEffect, Suspense } from 'react'
import { Responsive } from "react-grid-layout";

import styles from './Dashboard.module.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import StatsWidget from './Layout/StatsWidget'
import AllActivityWidget from './Layout/AllActivityWidget';
import PersonalTaskWidget from './Layout/PersonalTaskWidget';
import { getTasks, getAllUsers, getTasksById, getMostPopularModules } from '../api/users';
import useWindowDimensions from './hooks/useWindowDimensions';
import { getUniqueModules, parseUrl } from '../data/parseImports'

const Dashboard = () => {
    const [leaderboard, setLeaderBoard] = useState([])
    const [tasks, setTasks] = useState([])
    const [personalTasks, setPersonalTasks] = useState([])
    const [mostPopularModules, setMostPopularModules] = useState([])
    const refreshToken = localStorage.getItem("user")
    const user_id = localStorage.getItem("_id")

    const getAll = async () => {
        const result = await getAllUsers(refreshToken)
        setLeaderBoard(result)
        return result
    }

    const getAllTasks = async () => {
        const result = await getTasks(refreshToken)
        setTasks(result)
        return result
    }

    const getPersonalTasks = async () => {
        const result = await getTasksById(refreshToken, user_id)
        if (result != null) setPersonalTasks(result)
        return result
    }

    const getMostPopularTasks = async () => {
        const result = await getMostPopularModules(refreshToken);
        if (result != null) setMostPopularModules(result) 
        // console.log(result)
        return result
    }

    const layout = {
        lg: [
            { i: 'a', x: 0, y: 0, w: 4, h: 15, static: true },
            { i: 'b', x: 4, y: 0, w: 8, h: 6, static: true },
            { i: 'c', x: 5, y: 0, w: 8, h: 9, static: true },
        ],
    };

    useEffect(() => {
        getAll()
        getAllTasks()
        getPersonalTasks()
        getMostPopularTasks()
        parseUrl(localStorage.getItem("timetable")) 
    }, [])
    return (
        <div className={styles.page}> 
            <Responsive
                className="layout"
                layouts={layout}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={65}
                margin={{ lg: [28, 28], md: [24, 24], sm: [20, 20], xs: [16, 16], xxs: [0, 0] }}
                width={useWindowDimensions().width - 160}
            >
                <div key="a">
                    <AllActivityWidget leaderboard={leaderboard} tasks={tasks}/>
                </div>
                <div key='c'>
                    <StatsWidget id="b" backgroundColor="white" popularModules={mostPopularModules} personalTasks={personalTasks}/>
                </div>
                <div key="b">
                    <PersonalTaskWidget personalTasks={personalTasks} setPersonalTasks={setPersonalTasks} uniqueModules={getUniqueModules()}/>
                </div>

            </Responsive>
        </div>
    )
}

export default Dashboard