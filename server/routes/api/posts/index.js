import express from 'express'

import { getPosts, readPost, savePost } from './controller.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/:id', readPost)
router.post('/', savePost)

export default router