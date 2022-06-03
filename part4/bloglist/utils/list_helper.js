const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0

  blogs.forEach(element => {
    likes += element.likes
  })

  if (isNaN(likes)) {
    return 0 
  }

  return likes
}

module.exports = {
  dummy,
  totalLikes
}