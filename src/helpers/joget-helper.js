import axios from 'axios'
import { authHeader } from '@/helpers/auth-header'

export const jogetService = {
  startProcess,
  formSubmit,
  listAll,
  list,
  getCurrentActivity,
  processComplete,
  processCompleteWithVariable,
}

const axiosOptions = {
  headers: authHeader()
}

async function startProcess (appId, processDefId) {
  const axiosData = {
    app: {
      appId: appId,
      processDefId: processDefId
    }
  }
  return await axios.post(`${process.env.VUE_APP_BACKEND_URL}/process/start`, axiosData, axiosOptions)
}

async function formSubmit(appId, formId, primaryKey, formData) {
  const axiosData = {
    app: {
      appId: appId,
      formId: formId
    },
    primaryKey: primaryKey,
    formData: formData
  }
  return await axios.post(`${process.env.VUE_APP_BACKEND_URL}/form/submit`, axiosData, axiosOptions)
}

async function list(appId, listId, searchData) {
  const axiosData = {
    app: {
      appId: appId,
      listId: listId
    },
    search: searchData
  }
  return await axios.post(`${process.env.VUE_APP_BACKEND_URL}/list/get`, axiosData, axiosOptions)
}

async function listAll(appId, listId) {
  const axiosData = {
    app: {
      appId: appId,
      listId: listId
    }
  }
  return await axios.post(`${process.env.VUE_APP_BACKEND_URL}/list/getAll`, axiosData, axiosOptions)
}

async function getCurrentActivity(processId) {
  const axiosData = {
    processId: processId
  }
  return await axios.post(`${process.env.VUE_APP_BACKEND_URL}/process/view`, axiosData, axiosOptions)
}

async function processComplete(activityId) {
  const axiosData = {
    activityId: activityId
  }
  return await axios.post(`${process.env.VUE_APP_BACKEND_URL}/process/complete`, axiosData, axiosOptions)
}

async function processCompleteWithVariable(activityId, variableData) {
  const axiosData = {
    activityId: activityId,
    variables: variableData
  }
  return await axios.post(`${process.env.VUE_APP_BACKEND_URL}/process/completeWithVariable`, axiosData, axiosOptions)
}