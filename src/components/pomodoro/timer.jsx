import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Input, Alert } from 'reactstrap'

import { increasePoints } from "../../api/users";

const Timer = () => {
    const [time, setTime] = useState(900)
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
        const hours = Math.floor(remainingTime / 3600)
        const minutes = Math.floor((remainingTime % 3600) / 60)
        const seconds = remainingTime % 60

        if (hours === 0 && minutes === 0 && seconds === 0) {
            setPlaying(false)
            return "Time is up !"
        }
        return `${hours} : ${minutes} :${seconds}`
    }

    const handleSliderChange = ({ target: { name, value } }) => {
        if (!playing) setTime(value)
    }

    const increasePointsById = async () => {
        const result = await increasePoints(localStorage.getItem("user"), Number(time / 10), localStorage.getItem("_id"))
        console.log(result)
        return result
    }

    return (
        <>
            <div className="timer" id="timer">
                <CountdownCircleTimer
                    isPlaying={playing}
                    duration={time}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[time * 1, time * 0.75, time * 0.5, time * 0.1]}
                    size={300}
                    onComplete={() => {
                        increasePointsById()
                        setDone(true)
                    }}
                >
                    {handleTimerContent}
                </CountdownCircleTimer>

            </div>
            <Alert
                color="info"
                isOpen={done}
                style={{
                    textAlign: 'center', 
                    marginLeft: "700px", 
                    marginRight: '700px' ,
                    borderRadius: '50px', 
                    marginTop: '8px',
                    color: 'white',
                    backgroundColor: 'salmon',
                }}
            >
                {`You gained ${time/10} points ! Press reset to start again`}
            </Alert>
            <button id="start-stop" onClick={() => setPlaying(!playing)}>{playing ? "Stop" : "Start"}</button>
            {done && <button id="start-stop" onClick={() => {
                window.location.reload()
                setDone(false)
            }}>Reset Timer</button>}
            <div className="range-slider">
                {(!playing) && <Input className='range-slider' type={"range"} min="30" max="7200" value={time} step={300} onChange={handleSliderChange}></Input>}
                <h1>{"Timer set to " + time / 60 + " minutes"}</h1>
            </div>
        </>
    )
}

export default Timer