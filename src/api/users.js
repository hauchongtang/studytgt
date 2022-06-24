const axios = require('axios')

export const postForm = async (email, password, setError) => {
    try {
        const response = await axios.post('https://splatbackend.herokuapp.com/users/login',
        {
            "email": email,
            "password": password
        }
        )
        return response.data
    } catch (error) {
        setError(true)
        console.log(error)
    }
}

export const postSignUp = async (firstname, lastname, email, password, setError) => {
    try {
        const response = await axios.post('https://splatbackend.herokuapp.com/users/signup',
        {
            "first_name": firstname,
            "last_name": lastname,
            "email": email,
            "password": password
        }
        )

        return response.data
    } catch (error) {
        setError(true)
        console.log(error)
    }
}

// Authenticate with backend server using refresh token to see if its expired
export const authLoginSession = async (refreshToken) => {
    try {
        const response = await axios.get('https://splatbackend.herokuapp.com/splat/api',
        {
            headers: {
                'token': refreshToken
            }
        }
        )

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const modifyAccountDetails = async (firstname, lastname, email, setSuccess) => {
    try {
        const response = await axios.put('https://splatbackend.herokuapp.com/users', 
        {
            "first_name": firstname,
            "last_name": lastname,
            "email": email,
        }
        )
        console.log(response.data)
        setSuccess(true)
        return response.data
    } catch (error) {
        setSuccess(false)
        console.log(error)
    }
}

export const getAllUsers = async (refreshToken) => {
    try {
        const response = await axios.get('https://splatbackend.herokuapp.com/users',
        {
            headers: {
                'token': refreshToken
            }
        }
        )

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserById = async (refreshToken, id) => {
    try {
        const response = await axios.get(`https://splatbackend.herokuapp.com/users/${id}`,
            {
                headers: {
                    'token': refreshToken
                }
            }
        )

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const increasePoints = async (refreshToken, toAdd, id) => {
    try {
        const response = await axios.put(`https://splatbackend.herokuapp.com/users/${id}`,null,
            {
                headers: {
                    'token': refreshToken,
                },
                params: {
                    'pointstoadd': Math.round(toAdd)
                }
            }
        )

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getModuleInfoByModuleCode = async (moduleCode, semester, lessonType, classNo) => { // cached semesterData in user storage
    var type = 'Lecture'
    switch (lessonType) {
        case "LEC":
            type = "Lecture"
            break
        case "TUT":
            type = "Tutorial"
            break
        case "LAB": 
            type = "Lab"
            break
        case "REC":
            type = "Recitation"
            break
        default:
            type = "Lecture"
            break
    }

    try {
        const response = await axios.get(`https://api.nusmods.com/v2/2022-2023/modules/${moduleCode}.json`)
        if (localStorage.getItem(moduleCode+"-code") === null) {
            localStorage.setItem(moduleCode+"-code", JSON.stringify(response.data.semesterData))
            return response.data.semesterData[semester-1].timetable.filter(value => value.classNo === classNo && value.lessonType === type).map(value => value)
        }
        console.log("returned cached")
        return JSON.parse(localStorage.getItem(moduleCode+"-code"))[semester-1].timetable.filter(value => value.classNo === classNo && value.lessonType === type)
    } catch (error) {
        console.log(error)
    }
}

export const setTimetableUrl = async (linktoadd, refreshToken, id) => {
    try {
        const response = await axios.put(`https://splatbackend.herokuapp.com/users/modules/${id}`,null,
            {
                headers: {
                    'token': refreshToken,
                },
                params: {
                    'linktoadd': linktoadd
                }
            }
        )  
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const addTask = async (firstname, lastname, taskName, moduleCode, duration, hidden, user_id) => {
    try {
        const response = await axios.post('https://splatbackend.herokuapp.com/tasks',
            {
                "first_name": firstname,
                "last_name": lastname,
                "taskName": taskName,
                "moduleCode": moduleCode,
                "duration": duration,
                "hidden": hidden,
                "user_id": user_id
            }
        )

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getTasks = async (refreshToken) => {
    try {
        const response = await axios.get('https://splatbackend.herokuapp.com/tasks',
        {
            headers: {
                'token': refreshToken
            }
        }
        )

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getTasksById = async (refreshToken, id) => {
    try {
        const response = await axios.get(`https://splatbackend.herokuapp.com/tasks/${id}`,
        {
            headers: {
                "token": refreshToken
            }
        }
        )

        return response.data
    } catch (error) {
        console.log(error) 
    }
}