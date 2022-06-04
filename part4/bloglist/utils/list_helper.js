const { constant, property } = require('lodash')
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
    const mostBlogsAuthor = _.findKey(authorsAndNumberArticles, (blogs) => { return blogs === maxAnount })
    const authorObject = {
      author: mostBlogsAuthor,
      blogs: maxAnount
    }
    
    return authorObject
  } else {
    return 0
  }
}

const mostLikes = (blogs) => {
  if (blogs.length > 0) {
    const grouppedAuthors = _.groupBy(blogs, 'author')

    const authorsAndProperties = {}
    _.forEach(grouppedAuthors, (value, key) => { 
      authorsAndProperties[key] = value
    })

    const authorsAndLikes = {}
    _.forEach(authorsAndProperties, (properties, authorName) => { 
      let likes = 0
      _.forEach(properties, (value, key) => {
        _.forEach(value, (value, key) => {
          if (key === 'likes')
            likes += value
            authorsAndLikes[authorName] = likes
        })
      }) 
    })

    const numbersOfLikes = _.values(authorsAndLikes)
    const maxAnount = _.max(numbersOfLikes)
    const mostLikesAuthor = _.findKey(authorsAndLikes, (likes) => { return likes === maxAnount })
    const authorObject = {
      author: mostLikesAuthor,
      likes: maxAnount
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
  mostBlogs,
  mostLikes
}