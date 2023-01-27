const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require("cookie-parser")

const usersRoutes = require("./routes/users")
const personalRoutes = require("./routes/personal")

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
app.use("/personal", personalRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
  })
  .catch((error) => console.log(`${error} did not connect`))