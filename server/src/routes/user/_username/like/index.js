const router = require('express').Router({ mergeParams: true })
const { like } = require('../../../../controllers/likes')

router.route('/')
  .post(like)

module.exports = router
