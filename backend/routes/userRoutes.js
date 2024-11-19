const express = require('express');

const { register, login, logout, getOtherUser } = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.route("/register").post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/').get(isAuthenticated, getOtherUser)


module.exports = router;