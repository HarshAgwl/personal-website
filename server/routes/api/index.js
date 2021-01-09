import express from 'express'

import posts from './posts/index.js'

const router = express.Router()

router.use('/posts', posts)

export default router