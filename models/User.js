const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid emaial",
      ],
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://firebasestorage.googleapis.com/v0/b/darklight-9102.appspot.com/o/69e6ca1f9a304e8512236e61955b130e.jpg?alt=media&token=46a298ea-a1d3-4631-a0ba-f569c4bd18c7",
    },
    type: String,
    refreshToken: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
  }
)

//   Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
  next()
})

const User = mongoose.model("User", userSchema)
module.exports = User