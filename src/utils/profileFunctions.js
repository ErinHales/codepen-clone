const axios = require('axios');

module.exports = {
    getUserData: () => {
        return axios.get(`http://localhost:3000/api/users?id=3`).then(res => {
            return res.data;
        })
    },
    getNewUserPens: () => {
        return axios.get(`http://localhost:3000/api/pens/user/3/0?type=new`).then(res => {
            return res.data;
        })
    },
    getUserInfo: () => {
        return axios.get('http://localhost:3000/api/userinfo?userid=3').then(res => {
            return res.data[0];
        })
    },
    getLayout: () => {
        return axios.get('http://localhost:3000/api/layout').then(res => {
            return res.data;
        })
    },
    getPensByCurrency: () => {
        return axios.get(`http://localhost:3000/api/pens/user/0/0?type=new`).then(res => {
            return res.data[0];
        })
    }
}