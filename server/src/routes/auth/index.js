const router = require('express').Router();

const { login, register, confirmation } = require('../../controllers/users');

router.post('/login', login);
router.post('/register', register);

router.post('/confirmation/:token', confirmation);

module.exports = router;
