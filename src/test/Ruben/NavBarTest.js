const axios = require('axios');

module.exports={

   getUserData: function () {
    return axios.get('/api/users')
    // .then(res => { res.data.userid })
  }

}