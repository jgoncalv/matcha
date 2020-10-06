const router = require('express').Router({ mergeParams: true })
const { addUserInterest } = require('../../../../controllers/users')

router.route('/')
  .post(addUserInterest)

module.exports = router
