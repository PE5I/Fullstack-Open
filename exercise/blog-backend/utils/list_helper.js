const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, like) => {
    return sum + like
  }

  return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? undefined
    : blogs.reduce((blogA, blogB) => {
        return blogA.likes > blogB.likes ? blogA : blogB
      })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}