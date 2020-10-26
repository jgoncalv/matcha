const router = require('express').Router({ mergeParams: true })
const { like, getLikes } = require('../../../../controllers/likes')

router.route('/')
  .post(like)
  .get(getLikes)

module.exports = router
