const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Talofa',
    author: 'A',
    url: 'http://example.com',
    likes: 4,
  },
  {
    title: 'Malo',
    author: 'B',
    url: 'http://example.net',
    likes: 7,
  },
  {
    title: 'Io',
    author: 'C',
    url: 'http://example.org',
    likes: 0,
  },
]

const totalLikes = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.likes).reduce((sum, likes) => sum + likes)
}

module.exports = {
  initialBlogs, totalLikes
}