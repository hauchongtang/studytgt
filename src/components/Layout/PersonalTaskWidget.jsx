import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";

import AddTaskWidget from "./AddTask";
import TaskBubble from "./TaskBubble";
import styles from './Widget.module.css'

const PersonalTaskWidget = ({ personalTasks, setPersonalTasks, uniqueModules }) => {
    const [tabIndex, setTabIndex] = useState(0)
    const startTimer = (event) => {
        event.preventDefault()
        console.log("Timer started", event.target)
    }
    personalTasks.sort((a,b) => Date.parse(b) - Date.parse(a));

    return (
        <div 
            style={{ 
                width: 'auto', height: '100%', backgroundColor: 'white', overflowY: 'scroll'
            }}
            className={styles.widget}
        >
            <div style={{}}>
                <h3 className={styles.h3}>{'Personal'}</h3>
                <hr></hr>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                    <a className={`${styles.a} ${tabIndex === 0 ? styles.selected : ''}`} href="#tasksdone" onClick={() => setTabIndex(0)}>Pending</a>
                    <a className={`${styles.a} ${tabIndex === 1 ? styles.selected : ''}`} href="#taskstodo" onClick={() => setTabIndex(1)}>Done</a>
                </div>
            </div>
            <div className={styles.cardWrapper}>
                <div className={styles.cardColumn}>
                    {tabIndex === 1 && personalTasks.length !== 0 && personalTasks.map((item, idx) => {
                        return (
                        item.hidden === false && <div className={styles.cardContainer} key={idx+1*2} >
                            <TaskBubble 
                                title={item.taskName} 
                                points={Number(item.duration) * 60 / 100} 
                                subtitle={item.moduleCode} 
                                name={item.first_name + " " + item.last_name} 
                                duration={item.duration} 
                                date={item.updated_at} 
                                hidden={item.hidden}
                            />
                            
                        </div>
                    )
                    })}
                    {tabIndex === 0 && personalTasks.length !== 0 && personalTasks.map((item, idx) => {
                        return (
                        item.hidden === true && <div className={styles.cardContainer} key={idx+1*2} >
                            <TaskBubble 
                                id={item.ID}
                                title={item.taskName} 
                                points={Number(item.duration) * 60 / 100} 
                                subtitle={item.moduleCode}
                                duration={item.duration} 
                                date={item.updated_at} 
                                hidden={item.hidden}
                                onClick={startTimer}
                                data-testid={idx === 0 ? "task-element" : ""}
                            /> 
                        </div>
                    )
                    })}
                    {tabIndex === 0 && personalTasks.length === 0 && <Spinner type="grow" color="danger" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '140px' }} />}
                </div>
                <div className={styles.cardColumn}>
                    <h4 style={{ textAlign: 'center', fontWeight: '600', marginTop: '-44px' }}>Add a Task</h4>
                    {<AddTaskWidget setPersonalTasks={setPersonalTasks} personalTasks={personalTasks} uniqueModules={uniqueModules} />}
                </div>
            </div>
        </div>
    )
}

export default PersonalTaskWidget