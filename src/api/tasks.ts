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