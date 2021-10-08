import axios from 'axios'
import { authHeader } from '@/helpers/auth-header'

export const alfrescoService = {
  createAlfFolder,
  getAlfTicket,
  getAlfNodeChildren,
  deleteAlfNode,
}

const axiosOptions = {
  headers: { 
    'Content-Type': 'application/json'
  }
}

async function createAlfFolder(folderName, parentNode, ticket) {
  const axiosData = {
    name: folderName,
    nodeType: 'cm:folder'
  }
  return await axios.post(`${process.env.VUE_APP_ALF_URL}alfresco/api/-default-/public/alfresco/versions/1/nodes/${parentNode}/children?alf_ticket=${ticket}`, axiosData, axiosOptions)
}

async function getAlfTicket() {
  const axiosData = JSON.stringify({
    "username": "leave",
    "password": "thac"
  })
  return await axios.post(`${process.env.VUE_APP_ALF_URL}alfresco/s/api/login`, axiosData, axiosOptions)
}

async function getAlfNodeChildren(nodeId, ticket) {
  return await axios.get(`${process.env.VUE_APP_ALF_URL}alfresco/api/-default-/public/alfresco/versions/1/nodes/${nodeId}/children?alf_ticket=${ticket}&include=properties`)
}

async function deleteAlfNode(nodeId, ticket) {
  return await axios.delete(`${process.env.VUE_APP_ALF_URL}alfresco/api/-default-/public/alfresco/versions/1/nodes/${nodeId}?alf_ticket=${ticket}`)
}