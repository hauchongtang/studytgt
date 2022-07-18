import React from "react";
import { Table } from "reactstrap";

const RightPage = () => {
  return (
    <div>
      <div style={{ height: '5vh' }} />
      <h2>Leaderboard System</h2>
      <h4>Badges</h4>
      <p>New stuff will be added as time progresses...</p>
      <Table borderless>
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Badge
            </th>
            <th>
              Information
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              1
            </th>
            <td>
              1️⃣
            </td>
            <td>
              Baby Steps: Completed your first task !
            </td>
          </tr>
          <tr>
            <th scope="row">
              2
            </th>
            <td>
              ⭐
            </td>
            <td>
              Star: Completed 1 hour worth of tasks !
            </td>
          </tr> 
          <tr>
            <th scope="row">
              3
            </th>
            <td>
              ⭐⭐
            </td>
            <td>
              Star: Completed 1 day worth of tasks !
            </td>
          </tr> 
          <tr>
            <th scope="row">
              4
            </th>
            <td>
              ⭐⭐⭐
            </td>
            <td>
              Star: Completed 1 week worth of tasks !
            </td>
          </tr> 
          <tr>
            <th scope="row">
              5
            </th>
            <td>
              ⭐⭐⭐⭐
            </td>
            <td>
              Star: Completed 1 months worth of tasks !
            </td>
          </tr> 
        </tbody>
      </Table>
    </div>
  )
}

export default RightPage;