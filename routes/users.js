var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')

router.get('/user', userController.getUser)
router.get('/', userController.checkLogin)

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logout)
router.post('/loginWithGoogle', userController.loginUserWithGoogle)
router.post('/', userController.handleRefreshToken)

module.exports = router