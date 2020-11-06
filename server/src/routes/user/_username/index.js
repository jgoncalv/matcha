const router = require('express').Router({ mergeParams: true })
const { getUserProfil, updateUserProfile } = require('../../../controllers/users')

router.use('/likes', require('./likes'));
router.use('/interests', require('./interests'));
router.use('/images', require('./images'));
router.use('/search', require('./search'));
router.use('/visits', require('./visits'));
router.use('/reports', require('./reports'));
router.use('/blocks', require('./blocks'));

router.route('/')
  .get(getUserProfil)
  .put(updateUserProfile)

module.exports = router
