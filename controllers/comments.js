const asyncHandler = require('express-async-handler')
const Comments = require("../models/Comments")

// Get Comments
const getComments = asyncHandler(async (req, res) => {
    const {id, type} = req.query
    try{
      const comments = await Comments.find({idMovie: id, reply:''}).sort({createdAt:type === 'Descending' ?-1:1})
      res.status(200).json(comments)
    }
    catch(err) {
      res.status(400)
      throw new Error(err)
    }

})

// Get Comment
const getComment = asyncHandler(async (req, res) => {
    const {id} = req.query
    try{
      const comments = await Comments.findById(id)
      res.status(200).json(comments)
    }
    catch(err) {
      res.status(400)
      throw new Error(err)
    }

})

const getCommentReply = asyncHandler(async (req, res) => {
  const {id} = req.query
  try{
    const comments = await Comments.find({reply: id}).sort({createdAt: -1})
    res.status(200).json(comments)
  }
  catch(err) {
    res.status(400)
    throw new Error(err)
  }

})

const createComment = asyncHandler (async (req, res) => {
  const body = req.body
  try {
    const cmt = await Comments.create(body.data);
    res.status(200).json(cmt)
  } 
  catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

const updateReaction = asyncHandler (async (req, res) => {
  const {commentId, userId} = req.body
  try {
    const cmt = await Comments.findByIdAndUpdate(
      commentId,
      { $push: { likers: userId } },
      { new: true }
    )
    res.status(200).json(cmt)
  } 
  catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

const deleteReaction = asyncHandler (async (req, res) => {
  const {commentId, userId} = req.body
  try {
    const cmt = await Comments.findByIdAndUpdate(
      commentId,
      { $pull : { likers: userId } },
      { new: true }
    )
    res.status(200).json(cmt)
  } 
  catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

const deleteComment = async (req, res) => {
  const rs = await Comments.deleteMany()
    res.status(rs.statusCode).json(rs)
}

module.exports = {
    getComments,
    createComment,
    updateReaction,
    deleteReaction,
    deleteComment,
    getComment,
    getCommentReply
}