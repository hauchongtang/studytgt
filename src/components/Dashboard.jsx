import { Collapse } from 'reactstrap'
import React, { useState } from 'react'
import { Responsive, WidthProvider } from "react-grid-layout";

import styles from './Dashboard.module.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import Timer from './pomodoro/timer'
import Widget from './Layout/Widget'
import AllActivityWidget from './Layout/AllActivityWidget';

const Dashboard = () => {
    const layout = {
    lg: [
      { i: 'a', x: 0, y: 0, w: 4, h: 11.4, static: true },
      { i: 'b', x: 4, y: 0, w: 8, h: 6, static: true },
      { i: 'c', x: 5, y: 0, w: 8, h: 5.4, static: true },
    ],
    };

    const ResponsiveLayout = WidthProvider(Responsive)

    return (
        <div className={styles.page}>
            <ResponsiveLayout
                className="layout"
                layouts={layout}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={60}
                margin={{ lg: [42,42], md: [36,36], sm: [28,28], xs: [16,16], xxs: [0,0] }}
                width={1760}
            >   
                <div key="a">
                    <AllActivityWidget />
                </div>               
                <div key='c'>
                    <Widget id='c' backgroundColor='white' />
                </div>
                <div key="b">
                    <Widget id="b" backgroundColor="white" />
                </div>

            </ResponsiveLayout>
        </div>
    )
}

// const getFromLS = (key) => {
//     let ls = {};
//     if (global.localStorage) {
//         try {
//             ls = JSON.parse(global.localStorage.getItem('grid-layout-dash')) || {}
//         } catch (error) {

//         }
//     }
//     return ls[key]
// }

// const setToLS = (key, value) => {
//     if (global.localStorage) {
//         global.localStorage.setItem(
//             'grid-layout-dash',
//             JSON.stringify({ [key]: value, }),
//         );
//     }
// }

export default Dashboard