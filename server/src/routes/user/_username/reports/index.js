const router = require('express').Router({ mergeParams: true })
const { report } = require('../../../../controllers/reports')

router.route('/')
  .post(report)

module.exports = router
