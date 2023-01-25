var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

module.exports = router