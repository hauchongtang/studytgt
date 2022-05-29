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