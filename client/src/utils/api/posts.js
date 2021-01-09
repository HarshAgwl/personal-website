import axios from 'axios'

const apiBaseUrl = "/api"

export const searchPosts = (params) =>
    axios.get(`${apiBaseUrl}/posts`, {
        params
    })

export const readPost = (id) => 
    axios.get(`${apiBaseUrl}/posts/${id}`)

export const savePost = (document) =>
    axios.post(`${apiBaseUrl}/posts`, document)