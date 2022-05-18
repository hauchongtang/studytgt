const axios = require('axios')

export const postForm = async (email, password) => {
    await axios.post('https://splatbackend.herokuapp.com/users/login',
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
}