const mongoose = require("mongoose")

const commentSchema = mongoose.Schema(
  {
    idUser: {
      type: String,
      required: [true, "Please add a name"],
    },
    idMovie: {
      type: String,
    },
    content: String,
    time: dateTime,
    reply: String
  },
  {
    timestamps: true,
  }
)

const Comments = mongoose.model("Comments", commentSchema)
module.exports = Comments