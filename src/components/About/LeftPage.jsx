import React from "react";
import importpage from '../../assets/importpage.png';
import addtask from '../../assets/addtask.png';
import dotask from '../../assets/dotask.png';
import taskscreen from '../../assets/taskscreen.png';

const LeftPage = () => {
  return (
    <div>
      <div style={{ height: '5vh' }} />
      <h2>Getting Started</h2>
      <h4>1. Importing your modules</h4>
      <p>
        <a href="/planner">Import</a>
        &nbsp;your modules via&nbsp;
        <a href="https://nusmods.com/">NUSmods</a>
      </p>
      <img
        height={450}
        width='auto'
        src={importpage}
      />
      <div style={{ height: '5vh' }} />
      <h4>2. Adding Tasks</h4>
      <p>
        After importing your modules, you can use the  <a href="/">dashboard</a> Add Task function to 
        add tasks that you want to complete. The modules that you have already imported is added in the dropdown
        portion of the form. Furthermore, you can choose to plan your task and not do it immediately.
      </p>
      <img
        height={450}
        width='auto'
        src={addtask}
      />
      <div style={{ height: '5vh' }} />
      <h4>3. Doing Task</h4>
      <p>
        Click on the task available on the "Pending" tab to do the task.
      </p>
      <img
        height={450}
        width='auto'
        src={dotask}
      />
      <div style={{ height: '3vh' }} />
      <p>
        You will be redirected to the task panel where you can add mini tasks to do within the time limit !
      </p>
      <img
        height={300}
        width='auto'
        src={taskscreen}
      />
    </div>
  )
}

export default LeftPage;