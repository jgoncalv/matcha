const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config');

exports.verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}

exports.createJWT = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, jwtSecret, (err, token) => {
      if (err) return reject(err)
      resolve(token)
    })
  })
}
