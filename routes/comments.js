var express = require('express')
var router = express.Router()
const commentController = require('../controllers/comments')



router.get('/comments', commentController.getComments)

router.get('/comment', commentController.getComment)

router.get('/reply', commentController.getCommentReply)

router.post("/comments", commentController.createComment)

router.post("/like-comments", commentController.updateReaction)

router.post("/unlike-comments", commentController.deleteReaction)

router.post('/delComment', commentController.deleteComment)

module.exports = router