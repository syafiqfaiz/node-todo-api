const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.JSON_SECRET

const validToken = (token, callback) => (
  jwt.verify(token, TOKEN_SECRET, callback)
)

const checkToken = function (req, res, next) {
  const token = req.headers.authorization?.split(' ')?.[1];
  if (token) {

    validToken(token, (err, decoded) => {
      if(err) {
        return res.status(401).send()
      }
      req.curretUserId = decoded.id;
      next()
    })

    return
  } 

  res.status(403).json('unauthorized');
}

module.exports = checkToken
