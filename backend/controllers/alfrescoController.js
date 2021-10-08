const axios = require('axios')
const axiosOptions = {
    headers: {
        'Content-Type': 'application/json'
    }
}

module.exports = {
  login: async (req, res, next) => {
    const alfUser = {
      username: 'case',
      password: 'thac'
    }
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_ALF_URL}alfresco/s/api/login`), alfUser, axiosOptions)
    return result
  }
}
