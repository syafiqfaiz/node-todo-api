
const attachRequestTime = (req, res, next) => {
  req.startedAt = new Date()

  next()
}

module.exports = attachRequestTime
