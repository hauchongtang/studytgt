import React, { useEffect, useState } from "react";
import { Spinner, Table } from "reactstrap";

import {getAllUsers} from "../../api/users";

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
    const [result, setResult] = useState([])
    const refreshToken = localStorage.getItem("user")
    const getAll = async () => {
        const result = await getAllUsers(refreshToken)
        setResult(result)
        // localStorage.setItem("result", JSON.stringify(result))
        console.log(result)
        return result
    }    
    // var results = JSON.parse(localStorage.getItem("result"))
    // results = JSON.parse(localStorage.getItem("result"))

    useEffect(() => {
        getAll()
    },[])

    return (
        <>
            <h1 id="leaderboard">Leaderboard 🔥 (All Time)</h1>
            {result.length === 0 ? <div className="container tableload"><Spinner id="tableload"/></div> : <Table className="container" hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((data, idx) => {
                        return (
                            <tr>
                                <th scope="row">{idx+1}</th>
                                <td>{data.first_name + data.last_name}</td>
                                <td>{data.points}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>}
        </>
    )
}

export default Leaderboard