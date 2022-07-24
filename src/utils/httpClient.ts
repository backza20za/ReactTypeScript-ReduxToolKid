import axios from 'axios'

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_NODE_URL
})

export default httpClient
