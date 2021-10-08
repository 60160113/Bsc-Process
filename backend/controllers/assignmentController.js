const axios = require('axios')
const jogetUser = require('../configs/json/JogetUser.json')
const juser = jogetUser.jogetUser

module.exports = {
  getAssignment: async (req, res, next) => {
    const permission = req.payload.permission
    
    let params = ''
    if (req.body.search) {
      const search = req.body.search
      search.forEach((param) => {
        params = `${params}&${param.paramName}=${param.paramValue}`
      })
    }
    
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/workflow/assignment/list?j_username=${juser[permission].username}&j_password=${juser[permission].password}${params}`))
    return result
  }
}