const router = require('express').Router({ mergeParams: true })
const { searchUsers } = require('../../../../controllers/users')

router.route('/')
  .get(searchUsers);

module.exports = router
