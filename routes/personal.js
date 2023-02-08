var express = require('express')
var router = express.Router()
const bookmarkController = require('../controllers/bookmark')
const historyController = require('../controllers/history')

//bookmark
router.get('/bookmark', bookmarkController.getBookmark)
router.post('/findBookmark', bookmarkController.getSimpleBookmark)
router.post('/bookmark', bookmarkController.createBookmark)
router.delete('/bookmark', bookmarkController.deleteBookmark)


//history
router.get('/history', historyController.getHistory)
router.post('/history', historyController.createHistory)
router.delete('/history', historyController.deleteHistory)
router.delete('/historyAll', historyController.deleteAllHistory)
router.delete('/all', historyController.deleteAll)

module.exports = router