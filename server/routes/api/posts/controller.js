import posts from '../../../models/posts.js'

import { getValues, saveDocument } from '../../../utils/db.js'

export const getPosts = async(req, res) => {
    const { name = "", currentId = "", dir = "next" } = req.query

    const searchResultSize = 10

    const values = await getValues(posts, currentId, dir, searchResultSize, "title", name)

    res.send(values || [])    
}

export const readPost = async(req, res) => {
    const { id } = req.params

    const document = await posts.findOne({ "_id": id })
    
    res.send(document || {})
}

export const savePost = async(req, res) => {
    if(!req.user){
        res.status(403).send("Not authenticated")
        return
    }

    const data = await saveDocument(req, posts)
    res.send(data)
}