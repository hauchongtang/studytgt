import axios from "axios"

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