const router = require('express').Router({ mergeParams: true })
const { getUserProfil, updateUserProfile } = require('../../../controllers/users')

router.use('/like', require('./like'));
router.use('/interests', require('./interests'));

router.route('/')
  .get(getUserProfil)
  .put(updateUserProfile)

module.exports = router
