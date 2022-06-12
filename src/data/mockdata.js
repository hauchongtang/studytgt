import moment from "moment"

const getDatesOfTargetDay = (day, idx) => {
    var result = []
    var targetDay = moment()
        .startOf('month')
        .day(day);

    if (targetDay.date() > 7) targetDay.add(7, 'd');

    var month = targetDay.month();
    while (month === targetDay.month()) {
        result.push(targetDay.toLocaleString());
        targetDay.add(7, 'd');
    }

    return result;
}

// const mapModulesForMonth = () => {
//     var result = []
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
//     days.forEach((day, idx) => {
//         result.push(...getDatesOfTargetDay(day, idx))
//     })
//     return result
// }

/*
    0 - Monday to 4 - Friday
*/
const mockMapping = [
    [
        {
            moduleCode: 'CS2103',
            mode: 'Let',
            start: 13,
            end: 15
        },
        {
            moduleCode: 'CS2101',
            mode: 'Tut',
            start: 9,
            end: 10
        },
        {
            moduleCode: 'CS2101',
            mode: 'Rec',
            start: 8,
            end: 9
        },
    ],
    [],
    [
        {
            moduleCode: 'CS2102',
            mode: 'Lab',
            start: 10,
            end: 12
        },
    ],
    [],
    []
]

const determineDay = (idx) => {
    switch (idx) {
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
    }
}

const determineTitle = () => {
    var result = new Map()

    for (var i = 0; i < mockMapping.length; i++) {
        result.set(determineDay(i+1), mockMapping[i])
    }

    return result
}

var uniqueModuleCode = []

const eventsData = () => {
    const timetableEvents = determineTitle()
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    var result = []
    for (var day of days) {
        const daysOfWeek = getDatesOfTargetDay(day, 0)
        for (var e of timetableEvents.get(day)) {
            if (!uniqueModuleCode.includes(e.moduleCode)) {
                uniqueModuleCode.push(e.moduleCode)
            }
            for (var i of daysOfWeek) {
                const today = new Date(i);
                result.push({
                    id: Math.random(),
                    title: e.moduleCode + ' ' + (e.mode),
                    allDay: false,
                    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), e.start),
                    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), e.end)
                })
            }
        }
    }

    return result
}

export const getUniqueModules = () => {
    return uniqueModuleCode
}

// eventsData()

// const mockEventsData = [
// {
//     id: 1,
//     title: 'CS2103T',
//     allDay: false,
//     start: new Date(2022, 5, 11, 12),
//     end: new Date(2022, 5, 11, 13)
// }
// ]

const mockEventsData = eventsData()


export default mockEventsData