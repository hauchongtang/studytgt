import { Collapse } from 'reactstrap'
import React, { useState } from 'react'
import GridLayout from "react-grid-layout";

import styles from './Dashboard.module.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import Leaderboard from './leaderboard/leaderboard'
import Timer from './pomodoro/timer'
import Widget from './Layout/Widget'

const Dashboard = () => {
    const layout = [
        { i: 'a', x: 1, y: 0, w: 1.198, h: 6, isResizable: false },
        { i: 'b', x: 0, y: 0, w: 0.8, h: 11.4, minW: 2, maxW: 4, static: true },
        { i: 'c', x: 2, y: 0, w: 1.198, h: 5.405, minW: 2, maxW: 4, isResizable: false }
    ];
    return (
        <div className={styles.page}>
            <GridLayout
                className="layout"
                layout={layout}
                cols={2}
                rowHeight={60}
                width={1760}
            >   <div key="b">
                    <Widget id="b" backgroundColor="white" />
                </div>
                <div key="a">
                    <Widget id="a" backgroundColor="white" />
                </div>
                <div key='c'>
                    <Widget id='c' backgroundColor='white' />
                </div>
            </GridLayout>
        </div>
    )
}

export default Dashboard