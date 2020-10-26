const router = require('express').Router({ mergeParams: true })
const { addUserVisit, getVisits } = require('../../../../controllers/visits')

router.route('/')
  .post(addUserVisit)
  .get(getVisits)

module.exports = router
