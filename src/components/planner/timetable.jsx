import React, { useState } from "react";
import TimeTable from "react-timetable-events";

const Timetable = () => {
    return (
        <div className="timetable" id="timetable">
            <TimeTable
                events={{
                    monday: [
                        {
                            id: 1,
                            name: "Custom Event 1",
                            type: "custom",
                            startTime: new Date("2018-02-23T11:30:00"),
                            endTime: new Date("2018-02-23T13:30:00"),
                        },
                    ],
                    tuesday: [],
                    wednesday: [],
                    thursday: [],
                    friday: [],
                }}
            /></div>

    )
}

export default Timetable