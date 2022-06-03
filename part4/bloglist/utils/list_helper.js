const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length > 0) {
    let likes = 0

    blogs.forEach(element => {
      likes += element.likes
    })
    return likes
  } else {
    return 0
  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    return blogs.find(blog => blog.likes === maxLikes)
  } else {
    return 0
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const authorsAndNumberArticles = _.countBy(blogs, 'author')
    const numbersOfBlogs = _.values(authorsAndNumberArticles)
    const maxAnount = _.max(numbersOfBlogs)
    const mostBlogsAuthor = _.findKey(authorsAndNumberArticles, (o) => { return o === maxAnount })
    const authorObject = {
      author: mostBlogsAuthor,
      blogs: maxAnount
    }
    
    return authorObject
  } else {
    return 0
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}