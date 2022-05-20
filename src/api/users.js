const axios = require('axios')

export const postForm = async (email, password, setLoggedIn) => {
    try {
        const response = await axios.post('https://splatbackend.herokuapp.com/users/login',
        {
            "email": email,
            "password": password
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://splatbackend.herokuapp.com"
            }
        }
        )

        setLoggedIn(true)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const postSignUp = async (firstname, lastname, email, password) => {
    try {
        const response = await axios.post('https://splatbackend.herokuapp.com/users/signup',
        {
            "first_name": firstname,
            "last_name": lastname,
            "email": email,
            "password": password
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://splatbackend.herokuapp.com"
            }
        }
        )

        return response.data
    } catch (error) {
        console.log(error)
    }
}