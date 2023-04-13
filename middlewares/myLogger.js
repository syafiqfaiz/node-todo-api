const myLogger = function (req, res, next) {
  const method = req.method
  const originalUrl = req.originalUrl;
  const currentTime = new Date();
  console.log(method + " " + originalUrl +  ' ' +
    currentTime.toUTCString())

  next()
}

module.exports = myLogger
