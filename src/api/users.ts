import axios from "axios"

const domainProvider = 'https://splatbackend-production.up.railway.app';

export const getAllUsers = async (refreshToken: string) => {
  try {
    const response = await axios.get(`${domainProvider}/cached/users`, {
      headers: {
        'token': refreshToken
      }
    })

    return response.data;
  } catch (error) {
    return {
      error: error
    }
  }
}