const router = require('express').Router();
const { isLoggedMiddleware } = require('../middlewares/auth')

router.use('/auth', require('./auth'));
router.use('/user', isLoggedMiddleware, require('./user'));
router.use('/interests', isLoggedMiddleware, require('./interests'));

module.exports = router;
