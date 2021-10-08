const axios = require('axios')
const jogetUser = require('../configs/json/JogetUser.json')
const juser = jogetUser.jogetUser

module.exports = {
  submit: async (req, res, next) => {
    console.log(req.body)
    const reqApp = req.body.app
    const primaryKey = req.body.primaryKey
    const formData = req.body.formData
    const permission = req.payload.permission
    let formParam = ''
    Object.keys(formData).forEach(function (key) {
      formParam = `${formParam}&${key}=${formData[key]}`
    })
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/form/store/${reqApp.appId}/${reqApp.formId}/${primaryKey}?j_username=${juser[permission].username}&j_password=${juser[permission].password}${formParam}`))
    console.log(result);
    return result
  },

  delete: async (req, res, next) => {
    console.log(req.body)
    const reqApp = req.body.app
    const primaryKey = req.body.primaryKey
    const permission = req.payload.permission
    console.log(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/form/delete/${reqApp.appId}/${reqApp.formId}/${primaryKey}?j_username=${juser[permission].username}&j_password=${juser[permission].password}`))
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/form/delete/${reqApp.appId}/${reqApp.formId}/${primaryKey}?j_username=${juser[permission].username}&j_password=${juser[permission].password}`))
    return result
  }
}