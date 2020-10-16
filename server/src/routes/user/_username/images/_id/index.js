const router = require('express').Router({ mergeParams: true })
const { removeUserImage, changeAvatar } = require('../../../../../controllers/images');

router.route('/')
  .delete(removeUserImage)

router.route('/avatar')
  .put(changeAvatar)

module.exports = router;

