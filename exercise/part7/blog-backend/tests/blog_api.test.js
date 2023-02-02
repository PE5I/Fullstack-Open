const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./api_helper')
const Blog = require('../models/Blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

test('blogs are retrieved as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are retrieved', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned note', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(contents).toContain('Talofa')
})

test('unique identifier of a blog is identified by id', async () => {
  const response = await api.get('/api/blogs')
  const first = response.body[0]

  expect(first.id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const blog = {
    title: 'Aroha',
    author: 'K',
    url: 'http://example.dev',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(b => b.title)
  expect(contents).toContain('Aroha')
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await (await Blog.find({})).map(blog => blog.toJSON())
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlog = JSON.parse(JSON.stringify(blogToView))
  // console.log(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlog)
})

// test('a nonexistent blog returns 404', async () => {
//   await api.get('/api/blogs/234234234234234')
// })

test('likes property defaults to 0 if not specified', async () => {
  const blog = {
    title: 'Verynewtitle',
    author: 'L',
    url: 'http://example.com'
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs/')
  expect(response.body[3].likes).toBe(0)
})

test('blog missing title is not added', async () => {
  const blogWithoutTitle = {
    author: 'AuthorOfMissingTitle',
    url: 'http://example.com'
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  const contents = blogsAtEnd.map(r => r.author)
  expect(contents).not.toContain(blogWithoutTitle.author)
})

afterAll(() => {
  mongoose.connection.close()
})