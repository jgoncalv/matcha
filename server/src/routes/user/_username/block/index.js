const router = require('express').Router({ mergeParams: true })
const { block } = require('../../../../controllers/blocks')

router.route('/')
  .post(block)

module.exports = router
