const commentsRouter = require('express').Router({ mergeParams: true })
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
  console.log("params=> ", request.params)
  response.json(comments)
})

commentsRouter.get('/hey', async (request, response) => {
  console.log(request.params)
  response.send('ick')
})

commentsRouter.post('/', async (request, response) => {
  const blogId = request.params.blogId
  const content = request.body.content

  const blog = await Blog.findById(blogId)

  const newComment = new Comment({
    content,
    blogId
  })
  const savedComment = await newComment.save()
  blog.comments = blog.comments.concat(savedComment.id)
  await blog.save()
  response.json(savedComment)
})

// commentsRouter.post('')

module.exports = commentsRouter