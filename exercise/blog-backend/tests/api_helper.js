const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    username: 'root',
    passwordHash: 'notahash'
  },
  {
    name: 'John Smith',
    username: 'jsmith',
    passwordHash: 'somehash'
  },
  {
    name: 'Jane Doe',
    username: 'jdoe',
    passwordHash: 'nohash'
  }
]

const totalLikes = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.likes).reduce((sum, likes) => sum + likes)
}

const usersInDb = async () => {
  return await User.find({})
}

module.exports = {
  initialBlogs,
  initialUsers,
  totalLikes,
  usersInDb
}