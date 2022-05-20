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