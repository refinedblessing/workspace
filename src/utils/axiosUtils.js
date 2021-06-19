import axios from 'axios'

const API_URL = 'http://127.0.0.1:3000/api/v1/';

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
  }
})