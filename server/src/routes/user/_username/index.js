const router = require('express').Router({ mergeParams: true })
const { getUserProfil } = require('../../../controllers/users')

router.route('/')
  .get(getUserProfil)

module.exports = router
