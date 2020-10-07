const router = require('express').Router({ mergeParams: true })
const { getUserProfil } = require('../../../controllers/users')

router.use('/like', require('./like'));
router.use('/interests', require('./interests'));

router.route('/')
  .get(getUserProfil)

module.exports = router
