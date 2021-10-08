const axios = require('axios')
const jogetUser = require('../configs/json/JogetUser.json')
const juser = jogetUser.jogetUser

module.exports = {
  startProcess: async (req, res, next) => {
    const reqApp = req.body.app
    const permission = req.payload.permission
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/workflow/process/start/${reqApp.appId}:latest:${reqApp.processDefId}?j_username=${juser[permission].username}&j_password=${juser[permission].password}`))
    return result
  },
  
  viewProcess: async (req, res, next) => {
    const processId = req.body.processId
    const permission = req.payload.permission
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/workflow/assignment/process/view/${processId}?j_username=${juser[permission].username}&j_password=${juser[permission].password}`))
    return result
  },

  completeNoParam: async (req, res, next) => {
    const activityId = req.body.activityId
    const permission = req.payload.permission
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/workflow/assignment/complete/${activityId}?j_username=${juser[permission].username}&j_password=${juser[permission].password}`))
    return result
  },

  completeWithParams: async (req, res, next) => {
    console.log(req.body)
    const activityId = req.body.activityId
    const permission = req.payload.permission
    
    let params = ''
    if (req.body.variables) {
      const variables = req.body.variables
      variables.forEach((param) => {
        params = `${params}&var_${param.paramName}=${param.paramValue}`
      })
    }
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/workflow/assignment/completeWithVariable/${activityId}?j_username=${juser[permission].username}&j_password=${juser[permission].password}${params}`))
    return result
  },

  completedProcess: async (req, res, next) => {
    const activityId = req.activityId
    const permission = req.payload.permission
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/workflow/assignment/complete/${activityId}?j_username=${juser[permission].username}&j_password=${juser[permission].password}`))
    return result
  },

  setVar: async (req, res, next) => {
    console.log(req.body)
    const activityId = req.body.activityId
    const permission = req.payload.permission
    const paramName = req.body.paramName
    const paramValue = req.body.paramValue
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/jsonworkflow/assignment/variable/${activityId}/${paramName}?value=${paramValue}&j_username=${juser[permission].username}&j_password=${juser[permission].password}`))
    return result
  },

  viewHistory: async (req, res, next) => {
    const permission = req.payload.permission
    let params = ''
    if (req.body.search) {
      const search = req.body.search
      search.forEach((param) => {
        params = `${params}&${param.paramName}=${param.paramValue}`
      })
      console.log(params)
    }
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/monitoring/activity/list?j_username=${juser[permission].username}&j_password=${juser[permission].password}${params}`))
    return result
  },

  viewProcessVariable: async (req, res, next) => {
    const processId = req.body.processId
    const permission = 'admin'
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/workflow/variable/list/${processId}?j_username=${juser[permission].username}&j_password=${juser[permission].password}`))
    return result
  },

  taskReAssign: async (req, res, next) => {
    const activityId = req.body.activityId
    const taskOwner = req.body.taskOwner
    const taskAssignTo = req.body.assignTo
    const permission = 'admin'
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/monitoring/activity/reassign?activityId=${activityId}&username=${taskOwner}&replaceUser=${taskAssignTo}&j_username=${juser[permission].username}&j_password=${juser[permission].password}`))
    return result
  },

  abortProcess: async (req, res, next) => {
    const processId = req.body.processId
    const permission = 'admin'
    const result = await axios.post(encodeURI(`${process.env.VUE_APP_JOGET_URL}web/json/workflow/process/abort/${processId}?j_username=${juser[permission].username}&j_password=${juser[permission].password}`))
    return result
  }

}
