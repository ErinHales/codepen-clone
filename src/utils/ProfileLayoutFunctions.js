const axios = require('axios');
module.exports = {
    getPenLayout: () => {
        return axios.get('http://localhost:3030/api/layout')
            .then(res => {
                return res.data
            })
    },
    getUser: () =>{
        return axios.get('http://localhost:3030/api/users')
        .then(res =>{
            return res.data
        })
    }
}