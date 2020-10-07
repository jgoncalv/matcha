const router = require('express').Router({ mergeParams: true });

router.use('/:username', require('./_username'))

module.exports = router
