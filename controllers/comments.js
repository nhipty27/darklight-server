const asyncHandler = require('express-async-handler')
const Comments = require("../models/Comments")
const commentService = require("../services/comments")
const sse = require("../sse")

// Get Comments
const getComments = asyncHandler(async (req, res) => {
    const {id} = req.query
    
    const rs = await commentService.getCommentService(id)
    res.status(rs.statusCode).json(rs)
})

const createComment = asyncHandler (async (req, res) => {
  const body = req.body
  const result = await commentService.createCommentService(body)
  res.status(result.statusCode).json(result)
  if (!result.error) {
    //   emit post event
    sse.send(result.data[0], "comment")
  }
})

const updateReaction = asyncHandler (async (req, res) => {
  const commentId = req.params.id
  const userId = req.body.userId
  const result = await commentService.updateCommentReaction(commentId, userId)
  res.status(result.statusCode).json(result)
  if (!result.error) {
    const comment = result.data[0]
    const data = { liker: userId, comment }
    sse.send(data, "comment_reaction")
  }
})


module.exports = {
    getComments,
    createComment,
    updateReaction
}