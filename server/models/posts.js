import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchmea = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  teaser: {
    type: String
  },
  createdOn: {
    type: String
  }
})

export default mongoose.model('post', postSchmea, 'posts')