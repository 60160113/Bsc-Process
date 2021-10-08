import axios from 'axios'
import { authHeader } from '@/helpers/auth-header'

export const mailService = {
  sendMail,
}

const axiosOptions = {
  headers: authHeader()
}

async function sendMail (mailOption) {
  return await axios.post(`${process.env.VUE_APP_BACKEND_URL}/mail/send`, mailOption, axiosOptions)
}