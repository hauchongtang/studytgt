import axios from "axios"
import { Task } from "../../components/util/misc/tasklist";

const domainProvider = 'https://splatbackend-production.up.railway.app';

export const getTasks = async (accessToken: string) => {
    try {
        const response = await axios.get(`${domainProvider}/cached/tasks`,
            {
                headers: {
                    'token': accessToken
                }
            }
        )

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getTasksByUserId = async (accessToken: string, userId: string) => {
    try {
        const response = await axios.get(`${domainProvider}/cached/tasks/${userId}`,
            {
                headers: {
                    'token': accessToken
                }
            }
        )

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const addTask = async (accessToken: string, newTask: any, user_id: string) => {
    try {
        const response = await axios.post(`${domainProvider}/tasks`,
            {
                "first_name": newTask.first_name,
                "last_name": newTask.last_name,
                "taskName": newTask.taskName,
                "moduleCode": newTask.moduleCode,
                "duration": newTask.duration,
                "hidden": newTask.hidden,
                "user_id": user_id
            },
            {
                headers: {
                    'token': accessToken
                }
            })

        return response.data
    } catch (error) {
        console.log(error)
    }
}