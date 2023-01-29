const Comments = require("../models/Comments");

const getCommentService = async (idMovie) => {
  try {
    const comments = await Comments.find({idMovie: idMovie});
    const _length = comments.length;
    const message = _length === 0 ? "Not found" : "success";
    const error = _length === 0 ? true : false;
    const statusCode = _length === 0 ? 404 : 200;
    return { data: comments, error, message, statusCode };
  } 
  catch (error) {
    return {
      data: [],
      error: true,
      message: "Sorry an error occurred",
      statusCode: 500,
    };
  }
};

const createCommentService = async (comment) => {
  try {
    const _comment = await Comments.create(comment);
    return { data: [_comment], error: false, message: "success", statusCode: 200 };
  } catch (error) {
    return {
      data: [],
      error: true,
      message: "Sorry an error occurred",
      statusCode: 500,
    };
  }
};

const updateCommentReaction = async (commentId, userId) => {
  try {
    const post = await Comments.findByIdAndUpdate(
      commentId,
      { $push: { likers: userId } },
      { new: true }
    );
    return { data: [post], error: false, message: "success", statusCode: 200 };
  } 
  catch (error) {
    return {
      data: [],
      error: true,
      message: "Sorry an error occurred",
      statusCode: 500,
    };
  }
};


module.exports = {
  getCommentService,
  createCommentService,
  updateCommentReaction,
};