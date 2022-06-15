const router = require('express').Router();
const { createUser, login } = require('../controllers/auth');

router.post('/login', login);
router.post('/register', createUser);

module.exports = router;
