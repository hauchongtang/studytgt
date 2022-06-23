import React, { useEffect, useState } from "react";
import { Spinner, Table } from "reactstrap";
import GridLayout from "react-grid-layout";

import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import {getAllUsers} from "../../api/users";
import Widget from '../Layout/Widget'
import styles from './Leaderboard.module.css'

const mockData = [
    {
        name: "Hau Chong",
        points: "5"
    },
    {
        name: "Markus Wee",
        points: "15"
    }
]

const Leaderboard = () => {
    const layout = [
        { i: 'a', x: 1, y: 0, w: 1.198, h: 6, static: true },
        { i: 'b', x: 0, y: 0, w: 0.8, h: 11.4, minW: 2, maxW: 4, static: true },
    ];
    const [result, setResult] = useState([])
    const refreshToken = localStorage.getItem("user")
    const getAll = async () => {
        const result = await getAllUsers(refreshToken)
        setResult(result)
        // localStorage.setItem("result", JSON.stringify(result))
        return result
    }    
    // var results = JSON.parse(localStorage.getItem("result"))
    // results = JSON.parse(localStorage.getItem("result"))

    useEffect(() => {
        getAll()
    },[])

    return (
        // <div className="container" style={{ marginLeft: '11vw' }}>
        // <div style={{ textAlign: 'center', width: '85vw', backgroundColor: 'white' }}>
        //     <h1 id="leaderboard">Leaderboard 🔥 (All Time)</h1>
        //     {result.length === 0 ? <div className="container tableload"><Spinner id="tableload"/></div> : <Table className="container" hover>
        //         <thead>
        //             <tr>
        //                 <th>#</th>
        //                 <th>Name</th>
        //                 <th>Points</th>
        //                 <th>Hours Accumulated</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {result.map((data, idx) => {
        //                 return (
        //                     <tr>
        //                         <th scope="row">{idx+1}</th>
        //                         <td>{data.first_name + data.last_name}</td>
        //                         <td>{data.points}</td>
        //                         <td>{Number(data.points) / 6000}</td>
        //                     </tr>
        //                 )
        //             })}
        //         </tbody>
        //     </Table>}
        // </div></div>
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
            </GridLayout>
        </div>
    )
}

export default Leaderboard