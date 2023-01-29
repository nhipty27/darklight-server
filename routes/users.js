var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')

router.get('/user', userController.getUser)

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logout)
router.post('/loginWithGoogle', userController.loginUserWithGoogle)
module.exports = router