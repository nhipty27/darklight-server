var express = require('express')
var router = express.Router()
const commentController = require('../controllers/comments')



router.get('/comments', commentController.getComments)


router.post("/comments", commentController.createComment)

router.patch("/comments/:id", commentController.updateReaction)

router.post('/delComment', commentController.deleteComment)

module.exports = router