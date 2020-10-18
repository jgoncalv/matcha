const router = require('express').Router({ mergeParams: true });
const { searchVisits } = require('../../controllers/visits');

router.route('/')
  .get(searchVisits)

module.exports = router
