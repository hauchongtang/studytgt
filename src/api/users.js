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

export const postSignUp = async (firstname, lastname, email, password) => {
    await axios.post('https://splatbackend.herokuapp.com/users/signup',
    {
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password
    },
    {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://splatbackend.herokuapp.com"
        }
    }
    )
}