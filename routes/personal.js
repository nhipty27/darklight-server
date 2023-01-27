var express = require('express')
var router = express.Router()
const personalController = require('../controllers/personal')


//bookmark
router.get('/bookmark', personalController.getBookmark)
router.post('/findBookmark', personalController.getSimpleBookmark)
router.post('/bookmark', personalController.createBookmark)
router.delete('/bookmark', personalController.deleteBookmark)


module.exports = router