const router = require('express').Router({ mergeParams: true })
const { addUserVisit } = require('../../../../controllers/users')

router.route('/')
  .post(addUserVisit)

module.exports = router
