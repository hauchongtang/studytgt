const axios = require('axios')

const domainProvider = 'https://splatbackend-production.up.railway.app';

export const postForm = async (email, password, setError) => {
    try {
        const response = await axios.post(`${domainProvider}/users/login`,
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
        const response = await axios.post(`${domainProvider}/users/signup`,
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
        return error.response.data
    }
}

// Authenticate with backend server using refresh token to see if its expired
export const authLoginSession = async (refreshToken) => {
    try {
        const response = await axios.get(`${domainProvider}/splat/api`,
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
        const response = await axios.put(`${domainProvider}/users`,
            {
                "first_name": firstname,
                "last_name": lastname,
                "email": email,
            }
        )
        // console.log(response.data)
        setSuccess(true)
        return response.data
    } catch (error) {
        setSuccess(false)
        console.log(error)
    }
}

export const getAllUsers = async (refreshToken) => {
    try {
        const response = await axios.get(`${domainProvider}/cached/users`,
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
        const response = await axios.get(`${domainProvider}/cached/users/${id}`,
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
        const response = await axios.put(`${domainProvider}/users/${id}`, null,
            {
                headers: {
                    'token': refreshToken,
                },
                params: {
                    'pointstoadd': Math.round(toAdd)
                }
            }
        )

        return response
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
        if (localStorage.getItem(moduleCode + "-code") === null) {
            localStorage.setItem(moduleCode + "-code", JSON.stringify(response.data.semesterData))
            return response.data.semesterData[semester - 1].timetable.filter(value => value.classNo === classNo && value.lessonType === type).map(value => value)
        }
        // console.log("returned cached")
        return JSON.parse(localStorage.getItem(moduleCode + "-code"))[semester - 1].timetable.filter(value => value.classNo === classNo && value.lessonType === type)
    } catch (error) {
        console.log(error)
    }
}

export const setTimetableUrl = async (linktoadd, refreshToken, id) => {
    try {
        const response = await axios.put(`${domainProvider}/users/modules/${id}`, null,
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

export const addTask = async (firstname, lastname, taskName, moduleCode, duration, hidden, user_id, refreshToken) => {
    try {
        const response = await axios.post(`${domainProvider}/tasks`,
            {
                "first_name": firstname,
                "last_name": lastname,
                "taskName": taskName,
                "moduleCode": moduleCode,
                "duration": duration,
                "hidden": hidden,
                "user_id": user_id
            },
            {
                headers: {
                    'token': refreshToken
                }
            }
        )
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getTasks = async (refreshToken) => {
    try {
        const response = await axios.get(`${domainProvider}/cached/tasks`,
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
        const response = await axios.get(`${domainProvider}/cached/tasks/${id}`,
            {
                headers: {
                    "token": refreshToken
                }
            }
        )
        // console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const toggleTaskVisible = async (refreshToken, id) => {
    try {
        const response = await axios.put(`${domainProvider}/tasks/${id}`, null,
            {
                headers: {
                    "token": refreshToken
                }
            }
        )

        return response
    } catch (error) {
        console.log(error)
    }
}

export const getMostPopularModulesById = async (refreshToken, id) => {
    try {
        const response = await axios.get(`${domainProvider}/tasks/${id}`,
            {
                headers: {
                    "token": refreshToken
                }
            }
        )
        const moduleCountMap = new Map();
        response.data.forEach(item => {
            if (moduleCountMap.get(item.moduleCode) === undefined)
                moduleCountMap.set(item.moduleCode, 1)
            else {
                moduleCountMap.set(item.moduleCode, moduleCountMap.get(item.moduleCode) + 1)
            }
        })
        var array = []
        array = Array.from(moduleCountMap, ([moduleCode, count]) => ({ moduleCode, count }));
        // console.log(response)

        return array;
    } catch (error) {
        console.log(error);
    }
}

export const getMostPopularModules = async (refreshToken) => {
    try {
        const response = await axios.get(`${domainProvider}/stats/mostpopular`,
            {
                headers: {
                    "token": refreshToken
                }
            }
        )
        response.data.sort((a, b) => b.count - a.count)
        var result = []
        response.data.forEach(element => {
            result.push({ module_code: element._id.module_code, count: element.count })
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const changeParticulars = async (id, refreshToken, formObj, setError) => {
    try {
        var url = new URL(`${domainProvider}/users/update/${id}`);
        
        for (var item of Object.keys(formObj)) {
            if (formObj[item].toString() !== "") {
                url.searchParams.append(item, formObj[item].toString())
            }
        }

        const response = await axios.put(url, null,
            {
                headers: {
                    "token": refreshToken
                }
            }
        )

        return response.data;
    } catch (error) {
        console.log(error);
        setError(true);
    }
}