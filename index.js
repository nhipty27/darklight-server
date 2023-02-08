const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require("cookie-parser")
const socket = require("socket.io")
const verifyJWT = require('./middleware/verifyJWT')
const usersRoutes = require("./routes/users")
const personalRoutes = require("./routes/personal")
const commentRoutes = require("./routes/comments")

/* CONFIGURATION */
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//config cors

const corsOptions ={
  origin: process.env.BASE_URL, 
  credentials:true,            
  optionSuccessStatus:200
}
app.use(cors(corsOptions))

/* ROUTES */
app.use("/user", usersRoutes)

app.use(verifyJWT)
app.use("/personal", personalRoutes)
app.use("/comment", commentRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB Connection Successfully`)
    const server = app.listen(PORT, () => {console.log(`Server Port: ${PORT}`)})
    const io = socket(server, {
      cors: {
        origin: process.env.BASE_URL,
        credentials: true,
      },
    })

    global.onlineUsers = new Map()
    io.on("connection", (socket) => {
      global.commentSocket = socket
      socket.on("add-user", (userId) => {
        global.onlineUsers.set(userId, socket.id)
      })

      socket.on("send-comment", (data) => {
        for (const [key, value] of onlineUsers) {
          if(key !== data.idUser)
            socket.to(value).emit("comment-receive", data)
        }
      })

      socket.on("like-comment", (data) => {
        for (const [key, value] of onlineUsers) {
          if(key !== data.idUser)
            socket.to(value).emit("like-receive", data)
        }
      })

      socket.on("unlike-comment", (data) => {
        for (const [key, value] of onlineUsers) {
          if(key !== data.idUser)
            socket.to(value).emit("unlike-receive", data)
        }
      })
    })
  })
  .catch((error) => console.log(`${error} did not connect`))

