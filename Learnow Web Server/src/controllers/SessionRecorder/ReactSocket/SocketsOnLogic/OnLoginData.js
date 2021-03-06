import axios from 'axios'
import { dbURL } from '../../../../dbUrl.js'

export const onLoginData = (soc, userConfigs, email, password) => {
    /** get user data from db */
    axios.get(`${dbURL}/login`, {
        params: {
            email: email,
            password: password
        }
    })
    .then(res => {
        soc.emit('logged data', {email: email, name: res.data.name, userType: res.data.userType, token: res.data.token, success: res.data.success, message: res.data.message})
        for (let i = 0; i < userConfigs.length; i++) {
            if (userConfigs[i].userEmail === email) {
                return
            }
        }
        userConfigs.push(res.data.configResult)
    })
    .catch(err => {
        soc.emit('logged data', {success: err.response.data.success, message: err.response.data.message})
    })
}