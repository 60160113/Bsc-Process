const axios = require('axios')
const userApp = 'userAccountManagement'
const listForLogin = 'forLogin'
const jogetUser = require('../configs/json/JogetUser.json')
const juser = jogetUser.jogetUser

module.exports = {
  // test: async (req, res, next) => {
  //   return true
  // },
  findUser: async (req, res, next) => {
    console.log(req)
    const emailParam = `email=${req}`
    console.log(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/list/${userApp}/${listForLogin}?j_username=${juser['admin'].username}&j_password=${juser['admin'].password}&${emailParam}`))
    return await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/list/${userApp}/${listForLogin}?j_username=${juser['admin'].username}&j_password=${juser['admin'].password}&${emailParam}`))
    // await axios.post(encodeURI(`${process.env.APP_BACKEND_URL}web/json/data/list/${userApp}/${listForLogin}?j_username=${juser['admin'].username}&j_password=${juser['admin'].password}&${emailParam}`))
    //   .then((res) => {
    //     console.log(res.data)
    //   })
  },
  checkLogin: async (req, res, next) => {
    const reqData = req.body.data
    const reqPermission = req.body.permission
    let params = ''
    Object.keys(reqData).forEach(function(key) {
      params = `${params}&${key}=${reqData[key]}`
    })
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/list/${userApp}/${listForLogin}?j_username=${juser[reqPermission].username}&j_password=${juser[reqPermission].password}${params}`))
    return result
  },
  alfLogin: async (req, res, next) => {
    const alfUser = {
      username: 'admin',
      password: 'newpublicosdev'
    }
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_ALF_URL}alfresco/s/api/login`), alfUser, { headers: { 'Content-Type': 'application/json' }})
    return result
  },
  checkUser: async (req, res, next) => {
    const reqApp = req.body.app
    const permission = 'admin'
    const email = req.params.email
    const emailParam = `email=${email}`
    console.log(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/list/${reqApp.appId}/${reqApp.listId}?j_username=${juser[permission].username}&j_password=${juser[permission].password}&${emailParam}`))
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/data/list/${reqApp.appId}/${reqApp.listId}?j_username=${juser[permission].username}&j_password=${juser[permission].password}&${emailParam}`))
    return result
  },
}