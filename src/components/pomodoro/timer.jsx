import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Input, Alert, Button } from 'reactstrap'
import { Responsive } from "react-grid-layout";
import { FiArrowLeft } from 'react-icons/fi'

import useWindowDimensions from '../hooks/useWindowDimensions';
import { increasePoints, toggleTaskVisible } from "../../api/users";
import ToDoWidget from '../Layout/PomodoroToDoWidget'
import styles from '../Layout/Widget.module.css'
import { Link } from "react-router-dom";

const Timer = () => {
    const layout = {
        lg: [
            { i: 'a', x: 0, y: 0, w: 4, h: 11.4, static: true },
            { i: 'b', x: 4, y: 0, w: 8, h: 11.4, static: true },
        ],
    };
    const timerObj = JSON.parse(localStorage.getItem("timerObj"))
    const [time, setTime] = useState(Number(timerObj.duration * 60))
    const [playing, setPlaying] = useState(false)
    const [done, setDone] = useState(false)

    const handleTimerContent = ({ remainingTime }) => {
        // if (remainingTime === 0) {
        //     // (TODO) Add points to the user.
        //     // Show it in a popup / warning message

        //     setPlaying(false)
        //     return "Time is up !"
        // }
        // setComplete(false)
        // return remainingTime
        const minutes = Math.floor((remainingTime) / 60)
        const seconds = remainingTime % 60

        if (minutes <= 0 && seconds <= 0) {
            setPlaying(false)
            return "Time is up !"
        }
        return `${minutes} : ${seconds.toString().length === 1 ? '0' + seconds.toString() : seconds}`
    }

    const increasePointsById = async () => {
        const points = time < 100 ? 1 : Math.round(Number(time / 100))
        const result = await increasePoints(localStorage.getItem("user"), points, localStorage.getItem("_id"))
        return result
    }

    const toggleVisible = async () => {
        const result = await toggleTaskVisible(localStorage.getItem("user"), timerObj.id)
        return result
    }

    return (
        <div className={styles.page} style={{ marginLeft: '160px' }}>
            <Responsive
                className="layout"
                layouts={layout}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={useWindowDimensions().height / 22.7}
                margin={{ lg: [28, 28], md: [24, 24], sm: [20, 20], xs: [16, 16], xxs: [0, 0] }}
                width={useWindowDimensions().width - 160}
            >
                <div key="a" style={{ backgroundColor: 'white' }}>
                    <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', }}>
                        {!done && <Link to={'/'} style={{ color: 'black', padding: '20px 20px 20px 20px', backgroundColor: 'white', border: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                            <FiArrowLeft size={36} />
                        </Link>}
                        <div>
                            <Alert isOpen={done} style={{}}>
                                <h4 className="alert-heading">
                                    Well done!
                                </h4>
                                <p>
                                    You have completed your task. Kudos to being more efficient !
                                </p>
                                <hr />
                                <p className="mb-0">
                                    To continue on doing more tasks, click the button below to return to dashboard
                                </p>
                                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                    <Button style={{ backgroundColor: 'rgba(50,205,50, 0.3)' }}
                                        onClick={() => {
                                            toggleVisible()
                                        }}
                                    >
                                        <Link to={'/'}
                                            style={{
                                                color: 'darkgreen', margin: '36px 72px 16px 72px',
                                                padding: '16px 8px 16px 8px', fontSize: '24px', textDecoration: 'none', fontWeight: '600'
                                            }}
                                        >
                                            Back to Dashboard
                                        </Link>
                                    </Button>
                                </div>
                            </Alert>
                        </div>
                        <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '82px', fontSize: '52px', fontWeight: 600 }}>
                            {<CountdownCircleTimer
                                isPlaying={playing}
                                duration={time}
                                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                colorsTime={[time * 1, time * 0.75, time * 0.5, time * 0.1]}
                                size={300}
                                onComplete={() => {
                                    toggleVisible()
                                    increasePointsById() 
                                    setDone(true)
                                    setPlaying(false)
                                }}
                            >
                                {handleTimerContent}
                            </CountdownCircleTimer>}
                        </div>
                        {!done && <Button style={{ margin: '36px 56px 16px 56px', padding: '16px 8px 16px 8px', fontSize: '24px' }} onClick={() => setPlaying(true)}>{done && !playing ? "-" : !playing ? "Start" : "Focus !"}</Button>}
                    </div>
                </div>
                <div key="b">
                    <ToDoWidget id="b" backgroundColor='white' />
                </div>
            </Responsive>
        </div>
    )
}

export default Timer