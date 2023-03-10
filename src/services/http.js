import axios from 'axios'
import {API_URL} from '../utils/constants'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  }
})
