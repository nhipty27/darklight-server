const mongoose = require("mongoose")

const historySchema = mongoose.Schema(
  {
    idUser: {
      type: String,
      required: [true, "Please add a name"],
    },
    idMovie: {
      type: String,
    },
    imageMovie: {
      type: String,
      default: "https://firebasestorage.googleapis.com/v0/b/darklight-9102.appspot.com/o/69e6ca1f9a304e8512236e61955b130e.jpg?alt=media&token=46a298ea-a1d3-4631-a0ba-f569c4bd18c7",
    },
    timeWatch: dateTime,
    type: String,
    season: Number,
    ep: Number
  },
  {
    timestamps: true,
  }
)

const History = mongoose.model("History", historySchema)
module.exports = History