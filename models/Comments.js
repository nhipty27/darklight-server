const mongoose = require("mongoose")

const commentSchema = mongoose.Schema(
  {
    idUser: {
      type: String,
    },
    idMovie: {
      type: String,
    },
    content: String,
    likers: {
      type: [String],
      default: []
    },
    reply: String
  },
  {
    timestamps: true,
  }
)

const Comments = mongoose.model("Comments", commentSchema)
module.exports = Comments