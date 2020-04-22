import axios from 'axios'

import { dbURL } from '../../../../consts.js'

export const onLoginData = (soc, email, password) => {
    axios.get(`${dbURL}/login`, {
        params: {
            email: email,
            password: password
        }
    })
    .then(res => {
        soc.emit('logged data', {email: email, name: res.data.name, token: res.data.token, success: res.data.success, message: res.data.message})
    })
    .catch(err => {
        soc.emit('logged data', {success: err.response.data.success, message: err.response.data.message})
    })
}