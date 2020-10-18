const jwt = require('jsonwebtoken')

exports.authTokenDecoderMiddleware = function(req, res, next) {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    token = req.query.token
  } else if (
    req.headers.cookie &&
    req.headers.cookie.split('=')[0] === 'authToken'
  ) {
    token = req.headers.cookie.split('=')[1]
  }

  if (!token) return next();

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).send()

    req.user = decoded
    next()
  })
}

exports.isLoggedMiddleware = (req, res, next) => {
  if (!req.user) return res.status(401).send()
  next()
}
