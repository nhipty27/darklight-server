const express = require("express")
const sse = require("../sse")

const router = express.Router()

router.get("/", sse.init)

module.exports = router