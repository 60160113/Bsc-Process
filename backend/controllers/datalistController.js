const axios = require('axios')
const jogetUser = require('../configs/json/JogetUser.json')
const juser = jogetUser.jogetUser

module.exports = {
  getOne: async (req, res, next) => {
    const permission = req.payload.permission
    const reqApp = req.body.app
    let params = ''
    if (req.body.search) {
      const search = req.body.search
      search.forEach((param) => {
        params = `${params}&${param.paramName}=${param.paramValue}`
      })
    }
    console.log(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/list/${reqApp.appId}/${reqApp.listId}/?j_username=${juser[permission].username}&j_password=${juser[permission].password}${params}`))
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/list/${reqApp.appId}/${reqApp.listId}/?j_username=${juser[permission].username}&j_password=${juser[permission].password}${params}`))
    return result
  },
  getAll: async (req, res, next) => {
    const permission = req.payload.permission
    const reqApp = req.body.app
    
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/list/${reqApp.appId}/${reqApp.listId}/?j_username=${juser[permission].username}&j_password=${juser[permission].password}`))
    return result
  },
  get: async (req, res, next) => {
    const permission = req.payload.permission
    const reqApp = req.body.app
    let params = ''
    if (req.body.search) {
      const search = req.body.search
      search.forEach((param) => {
        params = `${params}&${param.paramName}=${param.paramValue}`
      })
    }
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/list/${reqApp.appId}/${reqApp.listId}/?j_username=${juser[permission].username}&j_password=${juser[permission].password}${params}`))
    return result
  }
}