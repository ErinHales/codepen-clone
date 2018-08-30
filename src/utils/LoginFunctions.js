const axios = require('axios');
module.exports = {
    login: (credentials, password) => {
        return axios.post('http://localhost:3030/api/auth/login', { credentials, password })
            .then(res => {
                return res.data
            })
    }
}