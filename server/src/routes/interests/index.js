const router = require('express').Router({ mergeParams: true });
const { searchInterests, addInterest } = require('../../controllers/interests');

router.route('/')
  .get(searchInterests)
  .post(addInterest)

module.exports = router
