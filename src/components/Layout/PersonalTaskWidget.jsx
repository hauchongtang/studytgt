import React, { useState } from "react";
import { useEffect } from "react";

import { getTasksById } from "../../api/users";
import AddTaskWidget from "./AddTask";
import TaskBubble from "./TaskBubble";
import styles from './Widget.module.css'

const PersonalTaskWidget = ({ personalTasks }) => {
    const [tabIndex, setTabIndex] = useState(0)
   
    return (
        <div 
            style={{ 
                width: 'auto', height: '100%', backgroundColor: 'white',
            }}
            className={styles.widget}
        >
            <div style={{}}>
                <h3 className={styles.h3}>{tabIndex === 0 ? 'Completed Tasks': 'Add Task'}</h3>
                <hr></hr>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                    <a className={`${styles.a} ${tabIndex === 0 ? styles.selected : ''}`} href="#tasks" onClick={() => setTabIndex(0)}>Tasks</a>
                    <a className={`${styles.a} ${tabIndex === 1 ? styles.selected : ''}`} href="#addtask" onClick={() => setTabIndex(1)}>Add Task</a>
                </div>
            </div>
            <div className={styles.cardList}>
                {tabIndex === 0 && personalTasks.length !== 0 && personalTasks.map((item, idx) => {
                    return (
                        <div className={styles.cardContainer} key={idx+1*2}>
                            <TaskBubble 
                                title={item.taskName} 
                                points={Number(item.duration) * 60 / 100} 
                                subtitle={item.moduleCode} 
                                name={item.first_name + " " + item.last_name} 
                                duration={item.duration} 
                                date={item.created_at} 
                                hidden={item.hidden}
                            />
                            
                        </div>
                    )
                })}
                {tabIndex === 1 && <AddTaskWidget/>}
            </div>
        </div>
    )
}

export default PersonalTaskWidget